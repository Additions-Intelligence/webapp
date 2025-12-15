"use server";

import {
  searchCrimeEntity,
  getCrimeById as getCrimeByIdService,
} from "@/services/crime.service";

export const searchCrime = async (name: string) => {
  return await searchCrimeEntity(name);
};

export const getCrimeById = async (id: number) => {
  return await getCrimeByIdService(id);
};
