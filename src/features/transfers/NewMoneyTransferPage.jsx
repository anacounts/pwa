import React, { useCallback } from "react";

import SimpleLayout from "../../layouts/SimpleLayout";

import Button from "../../components/Button";
import { List, ListScroller, ListTitle } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";
import Loader, { PageLoader } from "../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { FIND_BOOK_MEMBERS, FIND_MONEY_TRANSFERS } from "./queries";
import { CREATE_MONEY_TRANSFER } from "./mutations";

import * as money from "../../utils/money";
import * as form from "../../utils/form";

function nowStr() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  // Remove the 8 last chars of ISO string to get to minutes
  // e.g. 2022-06-26T19:14:02.768Z
  //                      ~~~~~~~~
  return now.toISOString().slice(0, -8);
}

function NewMoneyTransferPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createMoneyTransfer, { createLoading, createError }] = useMutation(
    CREATE_MONEY_TRANSFER,
    { refetchQueries: [FIND_MONEY_TRANSFERS] }
  );

  const handleOnSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const objectData = form.toObject(formData);

      const attrs = {
        bookId: id,

        label: objectData.label,
        amount: money.serialize(money.fromObjectData(objectData.amount)),
        type: objectData.type,
        date: new Date(objectData.date).toISOString(),

        peers: Object.values(objectData.peers)
          .filter(({ isPeer }) => isPeer)
          .map(({ memberId, weight }) => ({ memberId, weight })),
      };

      await createMoneyTransfer({
        variables: { attrs },
      });

      navigate(`/books/${id}/transfers`);
    },
    [createMoneyTransfer, navigate, id]
  );

  return (
    <SimpleLayout title="New transfer">
      <main>
        <form onSubmit={handleOnSubmit}>
          <div className="mx-4">
            <label>
              Label
              <input type="text" name="label" pattern=".{1,255}" />
            </label>
            <div className="flex items-baseline gap-4">
              <label>
                Amount
                {/* XXX When supporting other currencies, the "step" must be updated according to the current currency */}
                <input
                  type="number"
                  step="0.01"
                  name="amount[amount]"
                  required
                />
              </label>
              <label>
                Currency
                <select
                  name="amount[currency]"
                  title="Cannot be changed for the time being"
                  defaultValue="EUR"
                >
                  <option value="" disabled>
                    No other option available for now...
                  </option>
                  <option value="EUR">€</option>
                </select>
              </label>
            </div>
            <label>
              Type
              <select name="type" required>
                <option value="PAYMENT">Payment</option>
                <option value="INCOME">Income</option>
                <option value="REIMBURSEMENT">Reimbursement</option>
              </select>
            </label>

            <label>
              Date
              <input
                type="datetime-local"
                name="date"
                defaultValue={nowStr()}
                required
              />
            </label>
          </div>

          <PeerList />

          <div>
            <Button color="cta" className="mx-4">
              Create
            </Button>
            {createLoading && <Loader size="sm" />}
            {createError && <span>{createError.message}</span>}
          </div>
        </form>
      </main>
    </SimpleLayout>
  );
}

function PeerList() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(FIND_BOOK_MEMBERS, {
    variables: { bookId: id },
  });

  if (loading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { members } = data.book;

  return (
    <List className="mb-4">
      <ListTitle className="flex justify-between">
        {/* TODO Add "select all" checkbox */}
        Members
        <span>Weight</span>
      </ListTitle>
      <ListScroller>
        {members.map(({ id, user }, index) => (
          <ListItem key={id} className="py-2">
            <label htmlFor={`peers[${id}]`} className="contents">
              <input
                type="hidden"
                name={`peers[new-${index}][memberId]`}
                value={id}
              />
              <input
                type="checkbox"
                defaultChecked
                name={`peers[new-${index}][checked]`}
                id={`peers[${id}]`}
              />
              <ListItemAvatar src={user.avatarUrl} />
              <ListItemLabel>{user.displayName}</ListItemLabel>

              <input
                type="number"
                step="0.01"
                defaultValue="1"
                name={`peers[new-${index}][weight]`}
                className="flex-1 w-full"
              />
            </label>
          </ListItem>
        ))}
      </ListScroller>
    </List>
  );
}

export default NewMoneyTransferPage;
