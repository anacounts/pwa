import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { BottomNav, BottomNavButton } from "../components/BottomNav";
import Icon from "../components/Icon";

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
          label="Books"
          icon="book"
          to="/books"
          active={activeItem === "books"}
        />
        <BottomNavButton
          label="Profile"
          icon="account"
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
