import axios from "axios";
import { baseURL } from "../api/config";

export const api = axios.create({
  baseURL,
});
