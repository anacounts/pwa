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
