import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/auth/authSlice";

// ======================================================
// LOGIN
// ======================================================
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },

    onSuccess: (data) => {
      const token = data.accessToken;

      // Redux handles authentication storage
      dispatch(loginSuccess(token));

      console.log("Login successful ✅");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};


// ======================================================
// REGISTER
// ======================================================
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
  });
};

// ======================================================
// CHANGE PASSWORD
// ======================================================
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData) => {
      const response = await api.post("/auth/change-password", passwordData);
      return response.data;
    },
  });
};

// ======================================================
// LOGOUT
// ======================================================
export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(logout());
  };
};