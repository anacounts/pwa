import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      email
      displayName
      avatarUrl
    }
  }
`;
