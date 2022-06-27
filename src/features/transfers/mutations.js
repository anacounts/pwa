import { gql } from "@apollo/client";

export const CREATE_MONEY_TRANSFER = gql`
  mutation CreateMoneyTransfer($attrs: MoneyTransferCreationInput!) {
    createMoneyTransfer(attrs: $attrs) {
      id
    }
  }
`;
