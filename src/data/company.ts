"use server";

import {
  getCompaniesService,
  getCompanyService,
  getCompanyOwnershipService,
  getCompanyFinancialsService,
  getCompanyFinancialRatiosService,
  getCompanyQuantitativeDisclosuresService,
  getCompanySubsidiariesService,
  getCompanySustainableDevelopmentService,
} from "@/services/company.service";

export const getCompanies = async (
  name: string,
  page: number = 1,
  page_size: number = 100
) => {
  const { data, pagination } = await getCompaniesService(name, page, page_size);
  return { data, pagination };
};

export const getCompany = async (ai_code: string) => {
  return await getCompanyService(ai_code);
};

export const getCompanyOwnership = async (ai_code: string) => {
  return await getCompanyOwnershipService(ai_code);
};

export const getCompanyFinancials = async (ai_code: string) => {
  return await getCompanyFinancialsService(ai_code);
};

export const getCompanyFinancialRatios = async (ai_code: string) => {
  return await getCompanyFinancialRatiosService(ai_code);
};

export const getCompanyQuantitativeDisclosures = async (ai_code: string) => {
  return await getCompanyQuantitativeDisclosuresService(ai_code);
};

export const getCompanySubsidiaries = async (ai_code: string) => {
  return await getCompanySubsidiariesService(ai_code);
};

export const getCompanySustainableDevelopment = async (ai_code: string) => {
  return await getCompanySustainableDevelopmentService(ai_code);
};

