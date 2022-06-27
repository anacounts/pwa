import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./features/auth/context";

import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import BookDetailsPage from "./features/books/BookDetailsPage";
import BooksPage from "./features/books/BooksPage";
import NewBookPage from "./features/books/NewBookPage";
import InvitationsPage from "./features/members/InvitationsPage";
import ProfilePage from "./features/profile/ProfilePage";
import ProfileEditPage from "./features/profile/ProfileEditPage";
import MoneyTransfersPage from "./features/transfers/MoneyTransfersPage";
import NewMoneyTransferPage from "./features/transfers/NewMoneyTransferPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/new" element={<NewBookPage />} />
        <Route path="/books/:id/">
          <Route path="details" element={<BookDetailsPage />} />
          <Route path="transfers" element={<MoneyTransfersPage />} />
          <Route path="transfers/new" element={<NewMoneyTransferPage />} />
          <Route path="invite" element={<InvitationsPage />} />
          <Route index element={<Navigate to="details" replace />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route index element={<Navigate to="/books" replace />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }) {
  let { token } = useAuth();
  let location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
