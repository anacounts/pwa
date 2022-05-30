import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

import { useMutation } from "@apollo/client";
import { REGISTER } from "./mutations";

function RegisterPage() {
  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      register({ variables: { email, password } });
    },
    [register]
  );

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Register</h1>
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
          Register
        </Button>
        {loading && <Loader className="ml-4" />}
        {error && <div className="text-error">{error.message}</div>}
        {data ? (
          <div>
            Your account was created !<br />
            {/* TODO "An email was sent to confirm your email address" */}
            You can now <Link to="/auth/login">sign in here</Link>.
          </div>
        ) : (
          <div>
            Already have an account ? <br />
            <Link to="/auth/login">Sign in here</Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
