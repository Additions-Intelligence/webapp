import { useQuery } from "@tanstack/react-query";
import {
  getCompanies,
  getCompany,
  getCompanyOwnership,
  getCompanyFinancials,
  getCompanyFinancialRatios,
  getCompanyQuantitativeDisclosures,
  getCompanySubsidiaries,
} from "@/data/company";

export const useCompanies = (enabled = true) =>
  useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompany = (ai_code: string, enabled = true) =>
  useQuery({
    queryKey: ["company", ai_code],
    queryFn: () => getCompany(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompanyOwnership = (ai_code: string, enabled = true) =>
  useQuery({
    queryKey: ["company-ownership", ai_code],
    queryFn: () => getCompanyOwnership(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompanyFinancials = (ai_code: string, enabled = true) =>
  useQuery({
    queryKey: ["company-financials", ai_code],
    queryFn: () => getCompanyFinancials(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompanyFinancialRatios = (ai_code: string, enabled = true) =>
  useQuery({
    queryKey: ["company-financial-ratios", ai_code],
    queryFn: () => getCompanyFinancialRatios(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompanyQuantitativeDisclosures = (
  ai_code: string,
  enabled = true
) =>
  useQuery({
    queryKey: ["company-quantitative-disclosures", ai_code],
    queryFn: () => getCompanyQuantitativeDisclosures(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCompanySubsidiaries = (ai_code: string, enabled = true) =>
  useQuery({
    queryKey: ["company-subsidiaries", ai_code],
    queryFn: () => getCompanySubsidiaries(ai_code),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
