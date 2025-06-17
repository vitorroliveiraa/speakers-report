import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input.tsx";
import { Loader2, Plus, X } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form.tsx";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { User as UserIcon } from "lucide-react";
import { Button } from "../ui/button.tsx";
import api from "@/api.ts";
import { getCurrentUserLocal } from "@/utils/handle_cookies.ts";

type Item = {
  id: string;
  name: string;
  type: string;
};

interface CustomInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  data: Item[];
  position?: string;
  // onSpeakerSelect: (speaker?: Item, clearField?: string) => void;
  onAddMember?: (member: Item) => void;
}

const AutoCompleteInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  label,
  field,
  data,
  error,
  onAddMember,
}: CustomInputProps<TFieldValues, TName>) => {
  const [inputText, setInputText] = useState<string>(field.value?.name || "");
  const [suggestions, setSuggestions] = useState(data);
  const [noMatch, setNoMatch] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const skipNextSuggestionsUpdate = useRef(false);

  useEffect(() => {
    // if (field.value?.name === "") {
    //   setInputText("");
    //   setNoMatch(false);
    // }

    if (!field.value) {
      setInputText("");
      setSuggestions([]);
      setNoMatch(false);
    } else if (field.value?.name) {
      setInputText(field.value.name);
    }
  }, [field.value?.name]);

  useEffect(() => {
    if (skipNextSuggestionsUpdate.current) {
      skipNextSuggestionsUpdate.current = false;
      return;
    }

    if (inputText) {
      const filteredSuggestions = data?.filter((item: { name: string }) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      setNoMatch(filteredSuggestions.length === 0 && inputText.trim() !== "");
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setNoMatch(false);
      setShowSuggestions(false);
    }
  }, [inputText, data]);

  const clearInput = () => {
    setInputText("");
    field.onChange(undefined);
    // onSpeakerSelect(undefined, field.value?.name);
    setSuggestions([]);
    setNoMatch(false);
  };

  const handleSuggestionClick = (suggestion: Item) => {
    setInputText(suggestion.name);
    field.onChange(suggestion);
    // onSpeakerSelect(suggestion);
    setTimeout(() => setSuggestions([]), 0);
  };

  const handleMouseDown = (suggestion: Item) => {
    handleSuggestionClick(suggestion);
  };

  const addNewItem = async () => {
    if (inputText.trim() === "") return;

    try {
      setIsAddingItem(true);

      const dados = getCurrentUserLocal();

      const response = await api.post("/users/create/external-church-members", {
        name: inputText,
        ward_id: dados?.ward_id,
      });

      skipNextSuggestionsUpdate.current = true; // <-- Adiciona aqui

      // onSpeakerSelect(response.data);
      field.onChange(response.data);
      if (onAddMember) onAddMember(response.data);
      setIsAddingItem(false);
      setNoMatch(false);
      setInputText(response.data.name);
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (error) {
      console.log("Error adding new members: ", error);
      setIsAddingItem(false);
    }
  };

  return (
    <FormItem className="my-4">
      <FormLabel className="max-sm:text-base text-slate-700">{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 size-4 max-sm:size-4 -translate-y-1/2 text-slate-800" />
          <Input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              field.onChange(e.target.value);
            }}
            ref={inputRef}
            placeholder="Digite um nome"
            className={`focus-visible:ring-transparent w-full pr-10 pl-10 max-sm:h-12 text-sm max-sm:text-base border-2 ${
              error && "border-red-500"
            }`}
          />

          {inputText && (
            <button
              onClick={clearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          {inputText && suggestions?.length > 0 && showSuggestions && (
            <ul className="absolute z-10 w-full bg-white border-2 border-slate-200 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions?.map((suggestion: Item) => {
                return (
                  <li
                    key={suggestion.id}
                    className="m-1 px-4 py-2 hover:bg-slate-100 cursor-pointer rounded-sm"
                    onMouseDown={() => handleMouseDown(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                );
              })}
            </ul>
          )}
          {noMatch && inputText.trim() !== "" && (
            <div className="absolute z-10 w-full bg-white border-2 border-slate-200 rounded-md mt-1 p-2">
              <p className="text-sm text-slate-500 mb-2 truncate">
                Nenhuma correspondência encontrada para "{inputText}"
              </p>
              <Button
                size="sm"
                className="bg-slate-800 hover:bg-slate-700 text-white w-full flex items-center justify-center gap-1 min-h-[36px]"
                onClick={addNewItem}
                disabled={isAddingItem}
                title={
                  isAddingItem
                    ? "Adicionando..."
                    : `Adicionar "${inputText}" na lista`
                }
              >
                {isAddingItem ? (
                  <>
                    <Loader2 size={16} className="animate-spin flex-shrink-0" />
                    <span className="truncate">Adicionando...</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} className="flex-shrink-0" />
                    <span className="truncate">
                      Adicionar "
                      {inputText.length > 15
                        ? `${inputText.substring(0, 15)}...`
                        : inputText}
                      "
                    </span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage className="text-red-500">{error}</FormMessage>
    </FormItem>
  );
};

export default AutoCompleteInput;
