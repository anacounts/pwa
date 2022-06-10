import React from "react";
import { FormLayoutProvider } from "./context";
import FormHeader from "./FormHeader";

import "./FormLayout.css";

function FormLayout({ children }) {
  return (
    <FormLayoutProvider>
      <FormHeader />
      <main className="app-layout__main">{children}</main>
    </FormLayoutProvider>
  );
}

export default FormLayout;
