import {
  fetchCompaniesApi,
  fetchCompanyApi,
  fetchCompanyOwnership,
  fetchCompanyFinancials,
  fetchCompanyFinancialRatios,
  fetchCompanyQuantitativeDisclosures,
  fetchCompanySubsidiaries,
} from "@/lib/api/company.api";

export async function getCompaniesService(): Promise<ICompany[]> {
  const response = (await fetchCompaniesApi()).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch companies");
  }

  return response.data;
}

export async function getCompanyService(ai_code: string): Promise<ICompany> {
  const response = (await fetchCompanyApi(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch company");
  }

  return response.data;
}

export async function getCompanyOwnershipService(
  ai_code: string
): Promise<IOwnership[]> {
  const response = (await fetchCompanyOwnership(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch company ownership");
  }

  return response.data;
}

export async function getCompanyFinancialsService(
  ai_code: string
): Promise<IFinancialStatement[]> {
  const response = (await fetchCompanyFinancials(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch company financials");
  }

  return response.data;
}

export async function getCompanyFinancialRatiosService(
  ai_code: string
): Promise<IFinancialRatiosResponse[]> {
  const response = (await fetchCompanyFinancialRatios(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(
      response.message || "Failed to fetch company financial ratios"
    );
  }

  return response.data;
}

export async function getCompanyQuantitativeDisclosuresService(
  ai_code: string
): Promise<IQuantitativeDisclosure[]> {
  const response = (await fetchCompanyQuantitativeDisclosures(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(
      response.message || "Failed to fetch company qualitative disclosures"
    );
  }

  return response.data;
}

export async function getCompanySubsidiariesService(
  ai_code: string
): Promise<ISubsidiaryResponse[]> {
  const response = (await fetchCompanySubsidiaries(ai_code)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch company subsidiaries");
  }

  return response.data;
}
