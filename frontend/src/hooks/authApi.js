
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/auth/authSlice";

// ======================================================
// PUBLIC AUTH API
// ======================================================
const authApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// LOGIN
// ======================================================
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await authApi.post("/auth/login", credentials);
      return response.data;
    },

    onSuccess: (data) => {
      dispatch(loginSuccess(data.accessToken));
    },

    onError: (error) => {
      alert(`Login failed: ${error.message || error}`);
    },
  });
};

// ======================================================
// REGISTER
// ======================================================
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await authApi.post("/auth/register", userData);
      return response.data;
    },
  });
};

// ======================================================
// CHANGE PASSWORD - AUTHENTICATED USER
// ======================================================
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData) => {
      const response = await api.post(
        "/auth/change-password",
        passwordData
      );

      return response.data;
    },
  });
};

// ======================================================
// REQUEST PASSWORD RESET - PUBLIC
// ======================================================
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (emailData) => {
      const response = await authApi.post(
        "/auth/resetpassword",
        emailData
      );

      return response.data;
    },
  });
};

// ======================================================
// CONFIRM PASSWORD RESET - PUBLIC
// ======================================================
export const useConfirmPasswordReset = () => {
  return useMutation({
    mutationFn: async (resetData) => {
      const response = await authApi.post(
        "/auth/confirm-reset",
        resetData
      );

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
