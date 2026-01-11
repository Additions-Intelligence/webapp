import { fetchCrimeApi, fetchCrimeByIdApi } from "@/lib/api/crime.api";

export async function searchCrimeEntity(
  name: string,
  page: number,
  page_size: number
): Promise<{ data: ICrimeRecord[]; pagination: IPagination | null }> {
  const response = (await fetchCrimeApi(name, page, page_size)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch crime data");
  }

  return { data: response.data, pagination: response.pagination ?? null };
}

export async function getCrimeById(id: number): Promise<ICrimeRecord[]> {
  const response = (await fetchCrimeByIdApi(id)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch crime data");
  }

  return response.data;
}
