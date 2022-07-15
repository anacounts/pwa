import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($attrs: BookCreationInput!) {
    createBook(attrs: $attrs) {
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
