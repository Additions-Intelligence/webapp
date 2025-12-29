import { fetchKYCApi } from "@/lib/api/kyc.api";

export async function searchKYC(name: string): Promise<any[]> {
  const response = (await fetchKYCApi(name)).data;

  if (response.status !== 200 || !response.data) {
    throw new Error(response.message || "Failed to fetch KYC entities");
  }

  return response.data;
}
