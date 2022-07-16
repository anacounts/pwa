import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($attrs: BookCreationInput!) {
    createBook(attrs: $attrs) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: ID!, $attrs: BookUpdateInput!) {
    updateBook(id: $bookId, attrs: $attrs) {
      id
      name

      defaultBalanceParams {
        meansCode
        params
      }
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
