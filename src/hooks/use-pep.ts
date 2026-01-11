import { useQuery } from "@tanstack/react-query";
import { searchPep, getPepById } from "@/data/pep";

export const useSearchPep = (
  name: string,
  page: number = 1,
  page_size: number = 20,
  enabled = true
) =>
  useQuery({
    queryKey: ["pep", name, page, page_size],
    queryFn: () => searchPep(name, page, page_size),
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
