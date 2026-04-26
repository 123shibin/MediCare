import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import { persistStore, persistReducer } from "redux-persist";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// 🔥 FIX (custom storage)
const customStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage: customStorage,
};

// ✅ Persisted Reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// ✅ Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Persistor
export const persistor = persistStore(store);