import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($attrs: ProfileInput!) {
    updateProfile(attrs: $attrs) {
      displayName
    }
  }
`;
