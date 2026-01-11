import { useQuery } from "@tanstack/react-query";
import { searchCrime, getCrimeById } from "@/data/crime";

export const useSearchCrime = (
  name: string,
  page: number = 1,
  page_size: number = 20,
  enabled = true
) =>
  useQuery({
    queryKey: ["crime", name, page, page_size],
    queryFn: () => searchCrime(name, page, page_size),
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
