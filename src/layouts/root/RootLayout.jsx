import React from "react";
import RootBottomNav from "./RootBottomNav";
import RootHeader from "./RootHeader";

import "./RootLayout.css";

function RootLayout({ children }) {
  return (
    <>
      <RootHeader />
      <main className="app-layout__main">{children}</main>
      <RootBottomNav />
    </>
  );
}

export default RootLayout;
