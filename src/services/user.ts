import { IRegisterResponse } from "../interfaces/IRegisterResponse";
import api from "./api";

// Registe email in the server
export const register = async (email: string) => {
  const { data } = await api.post<IRegisterResponse>("register", {
    email,
  });
  return data;
};
