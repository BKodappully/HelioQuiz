import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import TriviaPage from "./pages/TriviaPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useAuth } from "./context/AuthContext"; // Import the authentication hook

const App: React.FC = () => {
  const { currentUser } = useAuth(); // Access the current user from AuthContext

  // ProtectedRoute Component: Redirects to login if not authenticated
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Route for Trivia */}
          <Route
            path="/trivia"
            element={
              <ProtectedRoute>
                <TriviaPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
