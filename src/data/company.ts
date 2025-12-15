"use server";

import { getCompaniesService } from "@/services/company.service";

export const getCompanies = async () => {
  return await getCompaniesService();
};
