import React from "react";
import RootBottomNav from "./RootBottomNav";

import "./RootLayout.css";

function RootLayout({ children }) {
  return (
    <>
      <header className="app-header">
        <nav>
          <strong className="app-header__title">Anacounts</strong>
        </nav>
      </header>
      <main className="app-layout__main">{children}</main>
      <RootBottomNav />
    </>
  );
}

export default RootLayout;
