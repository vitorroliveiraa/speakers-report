import axios from "axios";
import { getAccessToken } from "./utils/handle_cookies";

const baseURL = import.meta.env.VITE_URL_API;
const accessToken = getAccessToken();

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.toLowerCase() !== "/login")
        window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
