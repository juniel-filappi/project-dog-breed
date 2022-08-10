import { IBreedListResponse } from "../interfaces/IBreedListResponse";
import api from "./api";

// List all breeds or get one breed
export const list = async (breed?: string) => {
  const { data } = await api.get<IBreedListResponse>("list", {
    params: {
      breed,
    },
  });

  return data;
};
