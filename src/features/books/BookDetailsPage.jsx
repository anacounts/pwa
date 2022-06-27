import React, { useCallback } from "react";

import SimpleLayout from "../../layouts/SimpleLayout";

import { Accordion, AccordionItem } from "../../components/Accordion";
import { BookBottomNav } from "./common";
import Icon from "../../components/Icon";
import { List, ListScroller } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";
import { PageLoader } from "../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOK, GET_BOOKS } from "./queries";
import { DELETE_BOOK } from "./mutations";

function BookDetailsPage() {
  const navigate = useNavigate();

  // TODO Maybe move menu to its own component
  const [deleteBook, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_BOOK, { refetchQueries: [GET_BOOKS] });

  const { id } = useParams();

  const handleDelete = useCallback(async () => {
    await deleteBook({ variables: { id } });

    navigate(-1);
  }, [deleteBook, id, navigate]);

  // TODO
  if (deleteError) throw deleteError;

  return (
    <SimpleLayout
      title="Book"
      menu={
        <List element="menu">
          {/* TODO Add an alert when clicking here */}
          <ListItem
            className={deleteLoading ? "text-disabled" : "text-error"}
            onClick={handleDelete}
            role="button"
          >
            <Icon name="delete" />
            <ListItemLabel>Delete</ListItemLabel>
          </ListItem>
        </List>
      }
    >
      <main className="app-layout__main">
        <BookDetails />
        <BookBottomNav />
      </main>
    </SimpleLayout>
  );
}

function BookDetails() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });

  if (loading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { name, members } = data.book;

  return (
    <Accordion>
      <AccordionItem title="Book details" defaultOpen>
        <List>
          <ListScroller>
            <ListItem>
              <Icon name="label" />
              <ListItemLabel>
                <span className="list-item__primary-line">Name</span>
                <br />
                <span className="list-item__secondary-line">{name}</span>
              </ListItemLabel>
            </ListItem>
            {/* TODO Add "created at" information, based on "insertedAt" field */}
          </ListScroller>
        </List>
      </AccordionItem>
      <AccordionItem title={`${members.length} members`}>
        <List>
          <ListScroller>
            {members.map(({ id, role, user }) => (
              <ListItem key={id}>
                <ListItemAvatar src={user.avatarUrl} />
                <ListItemLabel>
                  <span className="list-item__primary-line">
                    {user.displayName}
                  </span>
                  <br />
                  <span className="list-item__secondary-line">{role}</span>
                </ListItemLabel>
              </ListItem>
            ))}
            {/* TODO Display only if user has right to add new members */}
            <ListItem to={`/books/${id}/invite`} role="button">
              <Icon name="account-plus" />
              <ListItemLabel>Add a new member</ListItemLabel>
            </ListItem>
          </ListScroller>
        </List>
      </AccordionItem>
    </Accordion>
  );
}

export default BookDetailsPage;
