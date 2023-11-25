import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import EventEmitter from "./hooks/eventEmitter.ts";

export const SingleTonEventEmitter = new EventEmitter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
