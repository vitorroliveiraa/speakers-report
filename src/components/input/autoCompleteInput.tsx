import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input.tsx";
import { X } from "lucide-react";
import { FormControl, FormItem, FormLabel } from "../ui/form.tsx";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { User as UserIcon } from "lucide-react";

interface FormFields {
  firstSpeaker: string;
  secondSpeaker: string;
  thirdSpeaker: string;
  sacramentMeetingDate: string;
}

type Item = {
  id: number;
  name: string;
};

interface CustomInputProps {
  label: string;
  field: ControllerRenderProps<
    FormFields,
    "firstSpeaker" | "secondSpeaker" | "thirdSpeaker"
  >;
  error?: FieldError;
  data: any;
  position?: string;
}

const AutoCompleteInput = ({ label, field, data }: CustomInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState(data);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      console.log(inputValue);

      const filteredSuggestions = data?.filter((item: { name: string }) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      console.log(filteredSuggestions);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Limpa as sugestões quando o input está vazio
    }
  }, [inputValue, data]);

  const clearInput = () => {
    setInputValue("");
    field.onChange(null);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: Item) => {
    console.log(suggestion);

    setInputValue(suggestion.name);
    field.onChange(suggestion.id);
    setTimeout(() => setSuggestions([]), 0);
    // setSuggestions([]);
  };

  const handleMouseDown = (suggestion: Item) => {
    handleSuggestionClick(suggestion); // Executa a seleção da sugestão
  };

  return (
    <FormItem className="my-4">
      <FormLabel className="max-sm:text-base text-slate-700">{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 size-4 max-sm:size-4 -translate-y-1/2 text-slate-800" />
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              //   field.onChange(e.target.value);
            }}
            ref={inputRef}
            placeholder="Digite um nome"
            className="w-full pr-10 pl-10 max-sm:h-12 text-sm max-sm:text-base border-2"
          ></Input>

          {inputValue && (
            <button
              onClick={clearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          {inputValue && suggestions?.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions?.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleMouseDown(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FormControl>
    </FormItem>
  );
};

export default AutoCompleteInput;
