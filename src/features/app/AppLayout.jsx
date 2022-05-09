import React from "react";
import AppBottomNav from "../../components/AppBottomNav";
import AppHeader from "../../components/AppHeader";

function AppLayout({ children }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppBottomNav />
    </>
  );
}

export default AppLayout;
