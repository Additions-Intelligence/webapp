import { fetchPepApi, fetchPepByIdApi } from "@/lib/api/pep.api";

export async function searchPepEntity(name: string): Promise<IPEPRecord[]> {
  const response = (await fetchPepApi(name)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch PEP entities");
  }

  return response.data;
}

export async function getPepById(id: number): Promise<IPEPRecord[]> {
  const response = (await fetchPepByIdApi(id)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch PEP record by ID");
  }

  return response.data;
}
