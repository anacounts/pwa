import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($displayName: String!) {
    updateProfile(attrs: { displayName: $displayName }) {
      displayName
    }
  }
`;
