import { gql } from "@apollo/client";

export const INVITE_USER = gql`
  mutation InviteUser($bookId: ID!, $email: String!) {
    inviteUser(book_id: $bookId, email: $email) {
      id
    }
  }
`;
