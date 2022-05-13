import React from "react";
import AppBottomNav from "../components/app/AppBottomNav";
import AppHeader from "../components/app/AppHeader";

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
