import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  token: tokenFromStorage || null,

  // ✅ If token exists → user is authenticated
  isAuthenticated: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      // ✅ Save token permanently
      localStorage.setItem("token", action.payload);
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Remove token
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
