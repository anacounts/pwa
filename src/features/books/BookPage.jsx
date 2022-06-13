import React, { useCallback } from "react";

import { Accordion, AccordionItem } from "../../components/Accordion";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import { List, ListScroller } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOK, GET_BOOKS } from "./queries";
import { DELETE_BOOK } from "./mutations";

function BookPage() {
  const navigate = useNavigate();

  const [deleteBook, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_BOOK, { updateQueries: [GET_BOOKS] });

  const { id } = useParams();

  const { data, loading, errors } = useQuery(GET_BOOK, { variables: { id } });

  const handleDelete = useCallback(async () => {
    await deleteBook({ variables: { id } });

    navigate(-1);
  }, [deleteBook, id, navigate]);

  // TODO
  if (loading) return <></>;
  if (errors) return <></>;
  if (deleteError) return <></>;

  const { name, members } = data.book;

  return (
    <>
      <header className="app-header">
        <Button color="invisible" onClick={() => navigate(-1)}>
          <Icon name="arrow-left" alt="Go back" className="app-header__icon" />
        </Button>
        <strong className="app-header__title">Book</strong>
        <Dropdown
          toggle={<Icon name="dots-vertical" className="app-header__icon" />}
          menu={
            <List element="menu">
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
        />
      </header>
      <main className="app-layout__main">
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
              </ListScroller>
            </List>
          </AccordionItem>
          <AccordionItem title={`${members.length} members`}>
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
                      <span className="list-item__secondary-line">
                        {member.role}
                      </span>
                    </ListItemLabel>
                  </ListItem>
                ))}
              </ListScroller>
            </List>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
}

export default BookPage;
