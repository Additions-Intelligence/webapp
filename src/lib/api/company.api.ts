import api from "../axios";

export const fetchCompaniesApi = () =>
  api.get<ApiResponse<ICompany[]>>("/companies");

export const fetchCompanyApi = (ai_code: string) =>
  api.get<ApiResponse<ICompany>>(`/companies/${ai_code}`);

export const fetchCompanyOwnership = (ai_code: string) =>
  api.get<ApiResponse<IOwnership[]>>(`/companies/${ai_code}/ownership`);

export const fetchCompanyFinancials = (ai_code: string) =>
  api.get<ApiResponse<IFinancialStatement[]>>(
    `/companies/${ai_code}/financials`
  );

export const fetchCompanyFinancialRatios = (ai_code: string) =>
  api.get<ApiResponse<IFinancialRatiosResponse[]>>(
    `/companies/${ai_code}/financial-ratios`
  );

export const fetchCompanyQuantitativeDisclosures = (ai_code: string) =>
  api.get<ApiResponse<IQuantitativeDisclosure[]>>(
    `/companies/${ai_code}/quantitative-disclosures`
  );

export const fetchCompanySubsidiaries = (ai_code: string) =>
  api.get<ApiResponse<ISubsidiaryResponse[]>>(
    `/companies/${ai_code}/subsidiaries`
  );
