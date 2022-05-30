import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOG_IN } from "./mutations";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [logIn, { loading, error }] = useMutation(LOG_IN);

  async function signin(email, password) {
    const {
      data: { logIn: token },
    } = await logIn({
      variables: { email, password },
    });

    localStorage.setItem("authToken", token);
    setToken(token);
  }

  function disconnect() {
    localStorage.removeItem("authToken");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, loading, error, signin, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
