import { gql } from "@apollo/client";

export const CREATE_MONEY_TRANSFER = gql`
  mutation CreateMoneyTransfer($attrs: MoneyTransferCreationInput!) {
    createMoneyTransfer(attrs: $attrs) {
      id
      label
      amount
      type
      date

      holder {
        id

        user {
          id
          displayName
        }
      }
    }
  }
`;

export const UPDATE_MONEY_TRANSFER = gql`
  mutation UpdateMoneyTransfer(
    $transferId: ID!
    $attrs: MoneyTransferUpdateInput!
  ) {
    updateMoneyTransfer(transferId: $transferId, attrs: $attrs) {
      id
      label
      amount
      type
      date

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

export const DELETE_MONEY_TRANSFER = gql`
  mutation DeleteMoneyTransfer($transferId: ID!) {
    deleteMoneyTransfer(transferId: $transferId) {
      id
    }
  }
`;
