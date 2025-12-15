import api from "../axios";

export const fetchCrimeApi = (name: string) =>
  api.get<ApiResponse<ICrimeRecord[]>>(
    `/entity/search?name=${encodeURIComponent(name)}`
  );

export const fetchCrimeByIdApi = (id: number) =>
  api.get<ApiResponse<ICrimeRecord[]>>(`/entity/${id}`);
