import { fetchPepApi, fetchPepByIdApi } from "@/lib/api/pep.api";

export async function searchPepEntity(
  name: string,
  page: number = 1,
  page_size: number = 20
): Promise<{ data: IPEPRecord[]; pagination: IPagination | null }> {
  const response = (await fetchPepApi(name, page, page_size)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch PEP entities");
  }

  return { data: response.data, pagination: response.pagination ?? null };
}

export async function getPepById(id: number): Promise<IPEPRecord[]> {
  const response = (await fetchPepByIdApi(id)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch PEP record by ID");
  }

  return response.data;
}
