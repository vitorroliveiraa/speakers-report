import api from "@/api.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetWard = (unitNumber: string) => {
  const queryData = useQuery({
    queryKey: ["obter-ala" + unitNumber],
    queryFn: async (): Promise<IWard> => {
      const { data } = await api.get("wards/validate?unitNumber=" + unitNumber);
      return data.ward;
    },
    enabled: false,
  });
  return queryData;
};

export interface IWard {
  unitNumber: string;
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
}
