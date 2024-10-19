import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input.tsx";
import { X } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form.tsx";
import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { User as UserIcon } from "lucide-react";

type Item = {
  id: number;
  name: string;
};

interface CustomInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>; // O tipo do field já inclui todas as propriedades que ele carrega
  error?: FieldError;
  data: Item[];
  position?: string;
  onSpeakerSelect: (speaker?: Item, clearField?: string) => void;
}

const AutoCompleteInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  label,
  field,
  data,
  onSpeakerSelect,
  error,
}: CustomInputProps<TFieldValues, TName>) => {
  const [inputText, setInputText] = useState<string>(field.value?.name || "");
  const [suggestions, setSuggestions] = useState(data);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (field.value?.name === "") {
      setInputText("");
    }
  }, [field.value]);

  useEffect(() => {
    if (inputText) {
      const filteredSuggestions = data?.filter((item: { name: string }) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputText, data]);

  const clearInput = () => {
    onSpeakerSelect(undefined, field.value?.name);
    setInputText("");
    field.onChange("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: Item) => {
    setInputText(suggestion.name);
    field.onChange(suggestion);
    onSpeakerSelect(suggestion);
    setTimeout(() => setSuggestions([]), 0);
  };

  const handleMouseDown = (suggestion: Item) => {
    handleSuggestionClick(suggestion);
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
            className="focus-visible:ring-transparent w-full pr-10 pl-10 max-sm:h-12 text-sm max-sm:text-base border-2"
          ></Input>
          {/* {error && <span className="text-red-500">{error.message}</span>} */}

          {inputText && (
            <button
              onClick={clearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          {inputText && suggestions?.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions?.map((suggestion: Item) => {
                return (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleMouseDown(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </FormControl>
      <FormMessage className="text-red-500">{error?.message}</FormMessage>
    </FormItem>
  );
};

export default AutoCompleteInput;
