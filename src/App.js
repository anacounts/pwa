import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./features/auth/context";

import LoginPage from "./features/auth/LoginPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <div>Homepage</div>
          </RequireAuth>
        }
      />
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
