import React from "react";

import SimpleLayout from "../../layouts/SimpleLayout";

import { BookBottomNav } from "../books/common";
import Icon from "../../components/Icon";
import { List, ListScroller, ListTitle } from "../../components/list/List";
import { ListItem, ListItemLabel } from "../../components/list/ListItem";
import { PageLoader } from "../../components/Loader";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_BOOK_BALANCE } from "./queries";

import * as money from "../../utils/money";

function transferIconAndClassForAmount(amount) {
  return amount === "0.0"
    ? ["check", ""]
    : amount < 0
    ? ["minus", "text-error"]
    : ["plus", "text-success"];
}

function BookBalancePage() {
  return (
    <SimpleLayout title="Balance">
      <main className="app-layout__main">
        <BookBalance />
        <BookBottomNav />
      </main>
    </SimpleLayout>
  );
}

function BookBalance() {
  const { bookId } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK_BALANCE, {
    variables: { id: bookId },
  });

  if (loading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { membersBalance, transactions } = data.book.balance;

  return (
    <>
      <section>
        <List>
          <ListTitle>Members balance</ListTitle>
          <ListScroller>
            {membersBalance.map(({ member, amount: rawAmount }) => {
              const amount = money.parse(rawAmount);
              const [iconName, className] = transferIconAndClassForAmount(
                amount.amount
              );

              return (
                <ListItem key={member.id}>
                  <Icon className={className} name={iconName} />
                  <ListItemLabel>
                    <span className="list-item__primary-line">
                      {member.user.displayName}
                    </span>
                  </ListItemLabel>
                  <span className={`font-bold ${className}`}>
                    {money.format(amount)}
                  </span>
                </ListItem>
              );
            })}
          </ListScroller>
        </List>
      </section>
      <section>
        <List>
          <ListTitle>How to balance ?</ListTitle>
          <ListScroller>
            {transactions.length ? (
              transactions.map(({ from, to, amount: rawAmount }) => {
                const amount = money.parse(rawAmount);
                return (
                  <ListItem key={`${from.id}-${to.id}`}>
                    <ListItemLabel>
                      <span className="list-item__primary-line">
                        {from.user.displayName}
                      </span>
                      <span> gives </span>
                      <span className="list-item__primary-line">
                        {to.user.displayName}
                      </span>
                    </ListItemLabel>
                    {money.format(amount)}
                  </ListItem>
                );
              })
            ) : (
              <ListItem>The transactions are balanced already !</ListItem>
            )}
          </ListScroller>
        </List>
      </section>
    </>
  );
}

export default BookBalancePage;
