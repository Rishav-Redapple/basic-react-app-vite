import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// @ts-expect-error normal error
import "@picocss/pico";
import "./App.css";
import App from "./App.tsx";
import store from "./lib/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
