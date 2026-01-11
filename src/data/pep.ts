"use server";

import {
  searchPepEntity,
  getPepById as getPepByIdService,
} from "@/services/pep.service";

export const searchPep = async (
  name: string,
  page: number = 1,
  page_size: number = 20
) => {
  return await searchPepEntity(name, page, page_size);
};

export const getPepById = async (id: number) => {
  return await getPepByIdService(id);
};
