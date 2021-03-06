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
import { GET_BOOK_DETAILS, GET_BOOKS } from "./queries";
import { DELETE_BOOK } from "./mutations";

function balanceMeansCodeToLabel(code) {
  switch (code) {
    case "DIVIDE_EQUALLY":
      return "Divide equally";
    case "WEIGHT_BY_INCOME":
      return "Weight by income";
    default:
      console.error("Unknown balance means code: " + code);
      return code;
  }
}

function BookDetailsPage() {
  return (
    <SimpleLayout title="Book" menu={<PageMenu />}>
      <main className="app-layout__main">
        <BookDetails />
        <BookBottomNav />
      </main>
    </SimpleLayout>
  );
}

function PageMenu() {
  const navigate = useNavigate();

  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const { bookId } = useParams();

  const handleDelete = useCallback(async () => {
    await deleteBook({ variables: { id: bookId } });

    navigate(-1);
  }, [deleteBook, bookId, navigate]);

  // TODO
  if (error) throw error;

  return (
    <List element="menu">
      <ListItem to={`/books/${bookId}/edit`}>
        <Icon name="pencil" />
        <ListItemLabel>Edit</ListItemLabel>
      </ListItem>
      {/* TODO Add an alert when clicking here */}
      <ListItem
        className={loading ? "text-disabled" : "text-error"}
        onClick={handleDelete}
        role="button"
      >
        <Icon name="delete" />
        <ListItemLabel>Delete</ListItemLabel>
      </ListItem>
    </List>
  );
}

function BookDetails() {
  const { bookId } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: bookId },
  });

  if (loading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { name, defaultBalanceParams, members } = data.book;

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
            <ListItem>
              <Icon name="wallet" />
              <ListItemLabel>
                <span className="list-item__primary-line">Balancing</span>
                <br />
                <span className="list-item__secondary-line">
                  {balanceMeansCodeToLabel(defaultBalanceParams.meansCode)}
                </span>
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
            <ListItem to={`/books/${bookId}/invite`} role="button">
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
