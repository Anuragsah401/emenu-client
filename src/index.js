import React from "react";

import setupLocatorUI from "@locator/runtime";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

root.render(
  // <React.StrictMode>
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
