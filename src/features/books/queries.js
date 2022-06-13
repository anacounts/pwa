import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      name
      insertedAt

      members {
        id
        displayName
        avatarUrl
        role
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      members {
        id
      }
    }
  }
`;
