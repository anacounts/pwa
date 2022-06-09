import React from "react";
import { List, ListScroller, ListTitle } from "../../components/list/List";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./queries";

import FabContainer from "../../components/fab/FabContainer";
import Fab from "../../components/fab/Fab";
import Icon from "../../components/Icon";
import { PageLoader } from "../../components/Loader";
import {
  ListItemAvatar,
  ListItem,
  ListItemLabel,
} from "../../components/list/ListItem";

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
    <>
      <List>
        <ListTitle>{books.length} books in your list</ListTitle>
        <ListScroller>
          {books.map(({ id, name, members, avatarSrc }) => (
            <ListItem key={id} to={`/book/${id}`}>
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
    </>
  );
}

export default BooksPage;
