import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Create an AuthContext for managing auth state
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Provide authentication state to the entire app */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
