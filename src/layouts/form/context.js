import React, { useEffect, useState } from "react";

const FormLayoutContext = React.createContext(null);

export function FormLayoutProvider({ children }) {
  const [title, setTitle] = useState("");

  return (
    <FormLayoutContext.Provider value={{ title, setTitle }}>
      {children}
    </FormLayoutContext.Provider>
  );
}

/**
 * Returns the whole FormLayout context value.
 * /!\ Do not use outside of the directory !
 * @returns {{ title: String, setTitle: Function }}
 */
export function useFormLayout() {
  return React.useContext(FormLayoutContext);
}

/**
 * Defines the title of the page, which will be displayed by the FormLayout layout.
 * @param {String} title
 */
export function useTitle(title) {
  const { setTitle } = useFormLayout();

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
}
