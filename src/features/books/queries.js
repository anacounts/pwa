import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      insertedAt

      members {
        id
        role

        user {
          id
          displayName
          avatarUrl
        }
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
