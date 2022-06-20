import React, { useCallback } from "react";

import SimpleLayout from "../../layouts/SimpleLayout";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import { List, ListScroller } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";

import { useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOK, GET_BOOKS } from "../books/queries";
import { INVITE_USER } from "./mutations";

import "./InvitationsPage.css";

function InvitationsPage() {
  return (
    <SimpleLayout title="Invitations">
      <InviteForm />
      <InviteList />
    </SimpleLayout>
  );
}

export default InvitationsPage;

function InviteForm() {
  const { id: bookId } = useParams();

  const [inviteUser, { loading, error }] = useMutation(INVITE_USER, {
    updateQueries: [GET_BOOK, GET_BOOKS],
  });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");

      inviteUser({ variables: { bookId, email } });
    },
    [inviteUser, bookId]
  );

  return (
    <form className="invitations-page" onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name="email"
          placeholder="anacounts@example.com"
          required
          disabled={loading}
        />
      </label>

      <div className="book-invite-page__submit-button">
        <Button color="cta" className="mr-4" disabled={loading}>
          Add member
        </Button>
        {loading && <Loader size="sm" />}
        {error && <span>{error.message}</span>}
      </div>
    </form>
  );
}

function InviteList() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });

  // TODO
  if (loading) return <></>;
  if (error) return <></>;

  const { members } = data.book;

  return (
    <List>
      <ListScroller>
        {members.map((member) => (
          <ListItem key={member.id}>
            <ListItemAvatar src={member.avatarUrl} />
            <ListItemLabel>
              <span className="list-item__primary-line">
                {member.displayName}
              </span>
              <br />
              <span className="list-item__secondary-line">{member.role}</span>
            </ListItemLabel>
            <Icon name="check" />
          </ListItem>
        ))}
      </ListScroller>
    </List>
  );
}
