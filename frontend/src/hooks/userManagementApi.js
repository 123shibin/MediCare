import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import api from "../services/api";


// ======================================================
// GET ALL STAFF USERS
// ======================================================

export const useStaffUsers = () => {

  return useQuery({

    queryKey: ["staffUsers"],

    queryFn: async () => {

      const response = await api.get(
        "/api/user-management"
      );

      return response.data;
    },

  });
};


// ======================================================
// CREATE STAFF USER
// ======================================================

export const useCreateStaff = () => {

  return useMutation({

    mutationFn: async (userData) => {

      const response = await api.post(
        "/api/user-management",
        userData
      );

      return response.data;
    },

    onError: (error) => {

      console.error(
        "Staff creation failed:",
        error.response?.data?.message ||
        error.message
      );

    },

  });
};