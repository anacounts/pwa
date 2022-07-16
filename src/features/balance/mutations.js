import { gql } from "@apollo/client";

export const SET_BALANCE_USER_PARAMS = gql`
  mutation SetBalanceUserParams($meansCode: BalanceMeansCode!, $params: Json!) {
    setBalanceUserParams(meansCode: $meansCode, params: $params) {
      meansCode
      params
    }
  }
`;
