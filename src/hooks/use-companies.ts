import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/data/company";

export const useCompanies = (enabled = true) =>
  useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
