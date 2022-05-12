import React from "react";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";

import "./RootLayout.css";

function RootLayout({ children }) {
  return (
    <>
      <AppHeader />
      <main className="app-layout__main">{children}</main>
      <AppBottomNav />
    </>
  );
}

export default RootLayout;
