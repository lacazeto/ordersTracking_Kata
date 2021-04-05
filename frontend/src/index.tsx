import React from "react";
import ReactDOM from "react-dom";
import { OrderDataContextProvider } from "./context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <OrderDataContextProvider>
      <App />
    </OrderDataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
