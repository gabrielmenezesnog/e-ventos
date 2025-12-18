import { api } from "../api";
import { baseURL } from "../api/config";
import { iRegisterPayload } from "@/interfaces/iAuth";

export const register = async (payload: iRegisterPayload) => {
  const url = `${baseURL}/user`;

  const user = {
    id: 1,
    ...payload,
  };

  try {
    const response = await api.put(url, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
