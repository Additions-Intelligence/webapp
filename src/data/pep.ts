"use server";

import {
  searchPepEntity,
  getPepById as getPepByIdService,
} from "@/services/pep.service";

export const searchPep = async (name: string) => {
  return await searchPepEntity(name);
};

export const getPepById = async (id: number) => {
  return await getPepByIdService(id);
};
