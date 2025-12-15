import api from "../axios";

export const fetchPepApi = (name: string) =>
  api.get<ApiResponse<IPEPRecord[]>>(
    `/pep/search?name=${encodeURIComponent(name)}`
  );

export const fetchPepByIdApi = (id: number) =>
  api.get<ApiResponse<IPEPRecord[]>>(`/pep/${id}`);
