import React from "react";

import { Accordion, AccordionItem } from "../../components/Accordion";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { List, ListScroller } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";

import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_BOOK } from "./queries";

function BookPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, loading, errors } = useQuery(GET_BOOK, { variables: { id } });

  if (loading) return <></>;
  if (errors) return <></>;

  const { name, members } = data.book;

  return (
    <>
      <header className="app-header">
        <Button color="invisible" onClick={() => navigate(-1)}>
          <Icon name="arrow-left" alt="Go back" className="app-header__icon" />
        </Button>
        <strong className="app-header__title">Book</strong>
        <Button color="invisible">
          <Icon
            name="dots-vertical"
            alt="Go back"
            className="app-header__icon"
          />
        </Button>
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
