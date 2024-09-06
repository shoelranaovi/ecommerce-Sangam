import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </PersistGate>
  </StrictMode>
);
