import api from "../axios";

export const fetchCrimeApi = (name: string, page: number, page_size: number) =>
  api.get<ApiResponse<ICrimeRecord[]>>(
    `/entity/search?name=${encodeURIComponent(
      name
    )}&page=${page}&page_size=${page_size}`
  );

export const fetchCrimeByIdApi = (id: number) =>
  api.get<ApiResponse<ICrimeRecord[]>>(`/entity/${id}`);
