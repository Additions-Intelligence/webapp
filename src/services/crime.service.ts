import { fetchCrimeApi, fetchCrimeByIdApi } from "@/lib/api/crime.api";

export async function searchCrimeEntity(name: string): Promise<ICrimeRecord[]> {
  const response = (await fetchCrimeApi(name)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch crime data");
  }

  return response.data;
}

export async function getCrimeById(id: number): Promise<ICrimeRecord[]> {
  const response = (await fetchCrimeByIdApi(id)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch crime data");
  }

  return response.data;
}
