import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import appReducer from "./state/index.ts";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { loadState, saveState } from "./utils/utils.ts";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
