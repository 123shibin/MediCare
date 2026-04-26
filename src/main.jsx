import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./app/store";
import { queryClient } from "./utils/queryClient";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* ✅ Redux Persist */}
    <PersistGate loading={null} persistor={persistor}>
      
      {/* ✅ React Query */}
      <QueryClientProvider client={queryClient}>
        
        {/* ✅ React Router */}
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </QueryClientProvider>

    </PersistGate>
  </Provider>
);
