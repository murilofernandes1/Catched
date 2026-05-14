import axios from "axios";
import { getToken } from "./auth-storage";

const api = axios.create({
  baseURL: "http://192.168.3.108:8000/",
  timeout: 60000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
