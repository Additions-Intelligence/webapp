import { useQuery } from "@tanstack/react-query";
import { getCompaniesService } from "@/services/company.service";

export const useCompanies = (enabled = true) =>
  useQuery({
    queryKey: ["companies"],
    queryFn: getCompaniesService,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
