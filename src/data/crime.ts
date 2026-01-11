"use server";

import {
  searchCrimeEntity,
  getCrimeById as getCrimeByIdService,
} from "@/services/crime.service";

export const searchCrime = async (
  name: string,
  page: number = 1,
  page_size: number = 20
) => {
  return await searchCrimeEntity(name, page, page_size);
};

export const getCrimeById = async (id: number) => {
  return await getCrimeByIdService(id);
};
