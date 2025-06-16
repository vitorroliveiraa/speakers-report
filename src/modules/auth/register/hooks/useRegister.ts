import api from "@/api.ts";
import { useQuery } from "@tanstack/react-query";
import { IWard } from "../interfaces/register-interface.ts";

export const useGetWard = (unitNumber: string) => {
  const queryData = useQuery({
    queryKey: ["obter-ala" + unitNumber],
    queryFn: async (): Promise<IWard> => {
      const { data } = await api.get<{ ward: IWard }>(
        "wards/validate?unitNumber=" + unitNumber
      );
      return data.ward;
    },
    staleTime: 0,
    enabled: false,
  });
  return queryData;
};
