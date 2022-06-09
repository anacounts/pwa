import React, { useState } from "react";

import { useApolloClient, useMutation } from "@apollo/client";
import { INVALIDATE_TOKEN, LOG_IN } from "./mutations";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const apolloClient = useApolloClient();

  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [logIn, { loading, error }] = useMutation(LOG_IN);
  const [invalidateToken] = useMutation(INVALIDATE_TOKEN);

  async function signin(email, password) {
    const {
      data: { logIn: token },
    } = await logIn({
      variables: { email, password },
    });

    localStorage.setItem("authToken", token);
    setToken(token);
  }

  async function disconnect() {
    try {
      await invalidateToken({ variables: { token } });
    } finally {
      localStorage.removeItem("authToken");
      setToken(null);
      await apolloClient.cache.reset();
    }
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
