import { gql } from "@apollo/client";

export const GET_BOOK_BALANCE = gql`
  query GetBookBalance($id: ID!) {
    book(id: $id) {
      balance {
        membersBalance {
          member {
            id

            user {
              id
              displayName
            }
          }

          amount
        }

        transactions {
          from {
            id

            user {
              id
              displayName
            }
          }

          to {
            id

            user {
              id
              displayName
            }
          }

          amount
        }
      }
    }
  }
`;

export const BALANCE_USER_PARAMS = gql`
  query BalanceUserParams {
    balanceUserParams {
      meansCode
      params
    }
  }
`;
