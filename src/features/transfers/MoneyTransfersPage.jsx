import React from "react";

import SimpleLayout from "../../layouts/SimpleLayout";

import { BookBottomNav } from "../books/common";
import Icon from "../../components/Icon";
import { List, ListScroller } from "../../components/list/List";
import { ListItem, ListItemLabel } from "../../components/list/ListItem";
import { PageLoader } from "../../components/Loader";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { FIND_MONEY_TRANSFERS } from "./queries";

import * as date from "../../utils/date";
import * as money from "../../utils/money";
import Fab from "../../components/fab/Fab";
import FabContainer from "../../components/fab/FabContainer";

function transferIconAndClassForType(type) {
  if (type === "PAYMENT") return ["minus", "text-error"];
  if (type === "INCOME") return ["plus", "text-success"];
  // type === "REIMBURSEMENT"
  return ["arrow-right", ""];
}

function MoneyTransfersPage() {
  const { id } = useParams();

  return (
    <SimpleLayout title="Transfers">
      <main className="app-layout__main">
        <TransfersList />

        <FabContainer>
          <Fab to={`/books/${id}/transfers/new`}>
            <Icon name="plus" alt="Add new transfer" />
          </Fab>
        </FabContainer>
      </main>

      <BookBottomNav />
    </SimpleLayout>
  );
}

function TransfersList() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(FIND_MONEY_TRANSFERS, {
    variables: { bookId: id },
  });

  if (loading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { moneyTransfers } = data.book;

  return (
    <List>
      <ListScroller>
        {moneyTransfers.map(
          ({ id, label, amount: rawAmount, type, date: rawDate, holder }) => {
            const amount = money.parse(rawAmount);
            const [iconName, className] = transferIconAndClassForType(type);

            return (
              <ListItem key={id}>
                <Icon className={className} name={iconName} />
                <ListItemLabel>
                  <span className={`list-item__primary-line ${className}`}>
                    {label}
                  </span>
                  <br />
                  <span className="list-item__secondary-line">
                    {holder.user.displayName}
                  </span>
                </ListItemLabel>
                <div className="text-right">
                  <span className={`font-bold ${className}`}>
                    {money.format(amount)}
                  </span>
                  <br />
                  {date.formatShortDate(new Date(rawDate))}
                </div>
              </ListItem>
            );
          }
        )}
      </ListScroller>
    </List>
  );
}

export default MoneyTransfersPage;
