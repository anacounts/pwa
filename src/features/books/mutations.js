import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($attrs: BookInput!) {
    createBook(attrs: $attrs) {
      id
    }
  }
`;
