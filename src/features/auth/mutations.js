import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;
