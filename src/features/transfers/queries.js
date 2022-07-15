import { gql } from "@apollo/client";

export const FIND_MONEY_TRANSFERS = gql`
  query FindMoneyTransfers($bookId: ID!) {
    book(id: $bookId) {
      id

      moneyTransfers {
        id
        label
        type
        amount
        date

        tenant {
          id

          user {
            id
            displayName
          }
        }
      }
    }
  }
`;

export const GET_MONEY_TRANSFER = gql`
  query GetMoneyTransfer($id: ID!) {
    moneyTransfer(id: $id) {
      id
      label
      amount
      type
      date

      tenant {
        id
      }

      balanceParams {
        meansCode
        params
      }

      peers {
        id
        weight

        member {
          id
        }
      }
    }
  }
`;

export const FIND_BOOK_MEMBERS = gql`
  query FindBookMembers($bookId: ID!) {
    book(id: $bookId) {
      id

      members {
        id

        user {
          id
          displayName
          avatarUrl
        }
      }
    }
  }
`;
