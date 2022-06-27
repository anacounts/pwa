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

        holder {
          user {
            displayName
            avatarUrl
          }
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
          displayName
          avatarUrl
        }
      }
    }
  }
`;
