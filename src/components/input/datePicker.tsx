import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { FormControl, FormItem, FormLabel } from "../ui/form.tsx";
import { ControllerRenderProps, FieldError } from "react-hook-form";

type Item = {
  id: number;
  name: string;
};

interface FormFields {
  firstSpeaker: Item;
  secondSpeaker: Item;
  thirdSpeaker: Item;
  sacramentMeetingDate: Date;
}

interface AutoCompleteInputProps {
  label: string;
  field: ControllerRenderProps<FormFields, "sacramentMeetingDate">;
  error?: FieldError;
}

export default function DatePicker({ label, field }: AutoCompleteInputProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  return (
    <FormItem className="my-4">
      <FormLabel className="max-sm:text-base text-slate-700">{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal max-sm:h-12 text-sm max-sm:text-base border-2",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4 max-sm:size-4" />
                {field.value ? (
                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  field.onChange(date);
                  setSelectedDate(date);
                }}
                autoFocus
                defaultMonth={new Date()}
                startMonth={new Date(1999, 11)}
                endMonth={new Date(2025, 2)}
                locale={ptBR}
                disabled={{ dayOfWeek: [1, 2, 3, 4, 5, 6] }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </FormControl>
    </FormItem>
  );
}
