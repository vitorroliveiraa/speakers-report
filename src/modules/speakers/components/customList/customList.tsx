import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Person = {
  last_speech_date: string;
  name: string;
  speaker_position: number;
  sundays_since_last_speech: string;
};

interface Props {
  data: Person[];
}

export default function CustomList({ data }: Props) {
  const [displayDates, setDisplayDates] = useState<Record<number, boolean>>({});

  const toggleDisplay = (index: number) => {
    setDisplayDates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sortedData = [...data].sort(
    (a, b) =>
      Number(b.sundays_since_last_speech) - Number(a.sundays_since_last_speech)
  );

  return (
    <div className="space-y-4 mb-4">
      {sortedData?.map((person, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg bg-slate-800 p-4 hover:bg-slate-700 delay-100 duration-100 cursor-pointer"
        >
          <div className="flex-1">
            <h3 className="font-medium text-slate-100">{person.name}</h3>
          </div>
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-sm font-bold border-2 border-slate-300 bg-slate-600 text-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleDisplay(index);
            }}
          >
            {displayDates[index]
              ? person.last_speech_date
              : `${person.sundays_since_last_speech} domingos`}
          </Badge>
        </div>
      ))}
      {sortedData?.length === 0 && (
        <a href="">Nenhum discursante cadastrado.</a>
      )}
    </div>
  );
}
