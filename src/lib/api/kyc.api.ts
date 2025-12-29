import api from "../axios";

export const fetchKYCApi = (name: string) =>
  api.get<ApiResponse<any[]>>(
    `/profile/search?name=${encodeURIComponent(name)}`
  );
