import { api } from "../api";
import { baseURL } from "../api/config";

export const register = async (payload: {
  email: string;
  password: string;
}) => {
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
