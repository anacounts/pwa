import React from "react";
import { List, ListScroller, ListTitle } from "../../components/list/List";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./queries";
import {
  ListItemAvatar,
  ListItem,
  ListItemLabel,
} from "../../components/list/ListItem";

function formatBookSubtitle(users) {
  if (users.length === 1) {
    return "You only";
  }
  if (users.length === 2) {
    return "You and 1 other person";
  }
  return `You and ${users.length - 1} other people`;
}

function BooksPage() {
  const { data, loading } = useQuery(GET_BOOKS);

  if (loading) return;

  const { books } = data;

  return (
    <>
      <List>
        <ListTitle>{books.length} books in your list</ListTitle>
        <ListScroller>
          {books.map(({ id, name, users, avatarSrc }) => (
            <ListItem key={id} to={`/book/${id}`}>
              <ListItemAvatar src={avatarSrc} alt=""></ListItemAvatar>
              <ListItemLabel>
                <span className="list-item__primary-line">{name}</span>
                <br />
                <span className="list-item__secondary-line">
                  {formatBookSubtitle(users)}
                </span>
              </ListItemLabel>
            </ListItem>
          ))}
        </ListScroller>
      </List>
    </>
  );
}

export default BooksPage;
