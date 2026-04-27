import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/auth/authSlice";

// ✅ LOGIN
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/api/auth/login", credentials);
      return response.data;
    },

    onSuccess: (data) => {
      const token = data.accessToken;

      // ✅ Only Redux handles storage
      dispatch(loginSuccess(token));

      console.log("Login successful ✅");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// ✅ REGISTER
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/api/auth/register", userData);
      return response.data;
    },
  });
};

// ✅ LOGOUT
export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(logout());
  };
};