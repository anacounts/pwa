import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

import { useAuth } from "./context";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, loading, error } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleOnSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      await signin(email, password);
      navigate(from, { replace: true });
    },
    [signin, navigate, from]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <input placeholder="email" name="email" />
      <input placeholder="password" type="password" name="password" />
      <button>{loading ? <Loader /> : "Sign in"}</button>
      {error && <span>{error.message}</span>}
    </form>
  );
}

export default LoginPage;
