import { gql } from "@apollo/client";

export const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: ID!) {
    book(id: $id) {
      id
      name
      insertedAt

      defaultBalanceParams {
        meansCode
        params
      }

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
