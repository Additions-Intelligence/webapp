import { useQuery } from "@tanstack/react-query";
import { searchPep, getPepById } from "@/data/pep";

export const useSearchPep = (name: string, enabled = true) =>
  useQuery({
    queryKey: ["pep", name],
    queryFn: () => searchPep(name),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useGetPepById = (id: number, enabled = true) =>
  useQuery({
    queryKey: ["pep", "detail", id],
    queryFn: () => getPepById(id),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
