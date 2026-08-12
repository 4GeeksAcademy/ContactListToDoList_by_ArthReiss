import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/Home.css";
import { GlobalProvider } from "./Services/Globalprovider.jsx";
import { AppRoutes } from "./Services/Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppRoutes/>
    </GlobalProvider>
  </React.StrictMode>,
);