import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8083",
  headers: {
    "Content-Type": "application/json",
  },
});
     //attach token with every request 

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
      //logout token expired

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout()); // ✅ enough
    }
    return Promise.reject(error);
  }
);


export default api;