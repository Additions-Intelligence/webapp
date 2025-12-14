import api from "../axios";

export const fetchCompaniesApi = () =>
  api.get<ApiResponse<ICompany[]>>("/companies");
