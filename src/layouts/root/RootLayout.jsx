import React from "react";
import PropTypes from "prop-types";

import RootBottomNav from "./RootBottomNav";

import "./RootLayout.css";

function RootLayout({ className = "", children }) {
  return (
    <>
      <header className="app-header">
        <nav>
          <strong className="app-header__title">Anacounts</strong>
        </nav>
      </header>
      <main className={`app-layout__main ${className}`}>{children}</main>
      <RootBottomNav />
    </>
  );
}

RootLayout.propTypes = {
  className: PropTypes.string,
};

export default RootLayout;
