"use server";

import { aggregateRisks } from "@/lib/utils";
import { searchKYC as searchKYCService } from "@/services/kyc.service";

export const searchKYC = async (name: string) => {
  const response = await searchKYCService(name);

  const data = {
    business_risks: response.flatMap((r) => r.business_risks ?? []),
    financial_risks: response.flatMap((r) => r.financial_risks ?? []),
    crime_risks: response.flatMap((r) => r.crime_risks ?? []),
    pep_screening: response.flatMap((r) => r.pep_screening ?? []),
  };

  const aggregated = aggregateRisks(data);

  return aggregated;
};
