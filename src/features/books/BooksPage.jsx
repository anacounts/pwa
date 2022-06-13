import React from "react";
import FabContainer from "../../components/fab/FabContainer";
import Fab from "../../components/fab/Fab";
import { List, ListScroller, ListTitle } from "../../components/list/List";
import Icon from "../../components/Icon";
import { PageLoader } from "../../components/Loader";
import {
  ListItemAvatar,
  ListItem,
  ListItemLabel,
} from "../../components/list/ListItem";

import RootLayout from "../../layouts/root/RootLayout";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./queries";

function formatBookSubtitle(members) {
  if (members.length === 1) {
    return "You only";
  }
  if (members.length === 2) {
    return "You and 1 other person";
  }
  return `You and ${members.length - 1} other people`;
}

function BooksPage() {
  const { data, loading } = useQuery(GET_BOOKS);

  if (loading) return <PageLoader />;

  const { books } = data;

  return (
    <RootLayout>
      <List>
        <ListTitle>{books.length} books in your list</ListTitle>
        <ListScroller>
          {books.map(({ id, name, members, avatarSrc }) => (
            <ListItem key={id} to={`/books/${id}`}>
              <ListItemAvatar src={avatarSrc} alt=""></ListItemAvatar>
              <ListItemLabel>
                <span className="list-item__primary-line">{name}</span>
                <br />
                <span className="list-item__secondary-line">
                  {formatBookSubtitle(members)}
                </span>
              </ListItemLabel>
            </ListItem>
          ))}
        </ListScroller>
      </List>
      <FabContainer>
        <Fab to="/books/new">
          <Icon name="plus" alt="Add new book" />
        </Fab>
      </FabContainer>
    </RootLayout>
  );
}

export default BooksPage;
