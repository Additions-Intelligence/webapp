import { fetchCompaniesApi } from "@/lib/api/company.api";

export async function getCompaniesService(): Promise<ICompany[]> {
  const response = (await fetchCompaniesApi()).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch companies");
  }

  return response.data;
}
