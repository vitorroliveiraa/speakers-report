import { Badge } from "@/components/ui/badge";

type Person = {
  name: string;
  date: string;
  sundays: number;
};

const peoples: Person[] = [
  { name: "João B.", date: "13/09/2024", sundays: 15 },
  { name: "Maria A.", date: "12/09/2024", sundays: 10 },
  { name: "Carlos C.", date: "11/09/2024", sundays: 8 },
  // Adicione mais pessoas conforme necessário
];
export default function CustomList({ data }) {
  return (
    <div className="space-y-4 mb-4">
      {data?.map((person, index) => (
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
