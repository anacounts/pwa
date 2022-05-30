import React, { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

import { useAuth } from "./context";

import "./AuthPage.css";

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
    <div className="auth-page">
      <h1 className="auth-page__title">Log in</h1>
      <form onSubmit={handleOnSubmit} className="auth-page__form">
        <label>
          Email
          <input placeholder="john.doe@example.com" name="email" />
        </label>
        <label>
          Password
          <input
            placeholder="*****************"
            type="password"
            name="password"
          />
        </label>
        <Button color="cta" className="mb-4">
          Sign in
        </Button>
        {loading && <Loader className="ml-4" />}
        {error && <div className="text-error">{error.message}</div>}
        <div>
          Don't have an account ? <br />
          <Link to="/auth/register">Create one here</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
