import { useQuery } from "@tanstack/react-query";
import { searchCrime, getCrimeById } from "@/data/crime";

export const useSearchCrime = (name: string, enabled = true) =>
  useQuery({
    queryKey: ["crime", name],
    queryFn: () => searchCrime(name),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useGetCrimeById = (id: number, enabled = true) =>
  useQuery({
    queryKey: ["crime", "detail", id],
    queryFn: () => getCrimeById(id),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
