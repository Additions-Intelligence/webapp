import api from "../axios";

export const fetchPepApi = (
  name: string,
  page: number = 1,
  page_size: number = 20
) =>
  api.get<ApiResponse<IPEPRecord[]>>(
    `/pep/search?name=${encodeURIComponent(
      name
    )}&page=${page}&page_size=${page_size}`
  );

export const fetchPepByIdApi = (id: number) =>
  api.get<ApiResponse<IPEPRecord[]>>(`/pep/${id}`);
