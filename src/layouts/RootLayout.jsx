import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { BottomNav, BottomNavButton } from "../components/BottomNav";

import { useLocation } from "react-router-dom";

import "./RootLayout.css";

function RootLayout({ className = "", children }) {
  const location = useLocation();

  const activeItem = useMemo(() => {
    return location.pathname.startsWith("/profile") ? "profile" : "books";
  }, [location.pathname]);
  return (
    <>
      <header className="app-header">
        <nav>
          <strong className="app-header__title">Anacounts</strong>
        </nav>
      </header>
      <main className={`app-layout__main ${className}`}>{children}</main>
      <BottomNav>
        <BottomNavButton
          icon="book"
          label="Books"
          to="/books"
          active={activeItem === "books"}
        />
        <BottomNavButton
          icon="account"
          label="Profile"
          to="/profile"
          active={activeItem === "profile"}
        />
      </BottomNav>
    </>
  );
}

RootLayout.propTypes = {
  className: PropTypes.string,
};

export default RootLayout;
