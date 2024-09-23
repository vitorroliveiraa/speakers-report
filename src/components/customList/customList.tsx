import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Person = {
  name: string;
  date: string;
  sundays: number;
};

export default function CustomList({ data }) {
  const sortedData = [...data].sort(
    (a, b) =>
      Number(b.sundays_since_last_speech) - Number(a.sundays_since_last_speech)
  );

  return (
    <div className="space-y-4 mb-4">
      {sortedData?.map((person, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg bg-slate-500 p-4 hover:bg-slate-600 delay-100 duration-100 cursor-pointer"
        >
          <div className="flex-1">
            <h3 className="font-medium text-slate-100">
              {person.name.split(",")[1]}
            </h3>
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground text-slate-100">
              {person.last_speech_date}
            </div>
          </div>
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-sm font-bold border-2 border-slate-300 bg-slate-400 text-white"
          >
            {person.sundays_since_last_speech} domingos
          </Badge>
        </div>
      ))}
    </div>
  );
}
