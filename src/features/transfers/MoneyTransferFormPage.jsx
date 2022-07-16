import React, { useCallback } from "react";
import PropTypes from "prop-types";

import SimpleLayout from "../../layouts/SimpleLayout";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { List, ListScroller, ListTitle } from "../../components/list/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemLabel,
} from "../../components/list/ListItem";
import Loader, { PageLoader } from "../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import {
  FIND_BOOK_MEMBERS,
  FIND_MONEY_TRANSFERS,
  GET_MONEY_TRANSFER,
} from "./queries";
import {
  CREATE_MONEY_TRANSFER,
  DELETE_MONEY_TRANSFER,
  UPDATE_MONEY_TRANSFER,
} from "./mutations";

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

function MoneyTransferFormPage({
  title,
  menu,
  transferData = {},
  transferLoading,
  transferError,
  submitTitle,
  onSubmit,
  submitLoading,
  submitError,
}) {
  const handleOnSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const objectData = form.toObject(formData);

      const attrs = {
        label: objectData.label,
        amount: money.serialize(objectData.amount),
        type: objectData.type,
        date: new Date(objectData.date).toISOString(),
        tenantId: objectData.tenantId,
        balanceParams: {
          meansCode: objectData.balanceParams.meansCode,
          params: "{}",
        },

        peers: Object.values(objectData.peers)
          .filter(({ checked }) => checked)
          .map(({ checked, ...peer }) => peer),
      };

      onSubmit(attrs);
    },
    [onSubmit]
  );

  return (
    <SimpleLayout title={title} menu={menu}>
      <main>
        <form onSubmit={handleOnSubmit}>
          <TransferDetails
            transferData={transferData}
            transferLoading={transferLoading}
            transferError={transferError}
          />

          <PeerList
            transferData={transferData}
            transferLoading={transferLoading}
          />

          <div>
            <Button color="cta" className="mx-4">
              {submitTitle}
            </Button>
            {submitLoading && <Loader size="sm" />}
            {submitError && <span>{submitError.message}</span>}
          </div>
        </form>
      </main>
    </SimpleLayout>
  );
}

MoneyTransferFormPage.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.element,
  transferData: PropTypes.object,
  transferLoading: PropTypes.bool,
  transferError: PropTypes.object,
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLoading: PropTypes.bool,
  submitError: PropTypes.object,
};

function TransferDetails({ transferData, transferLoading, transferError }) {
  const { bookId } = useParams();

  const {
    data: membersData,
    loading: membersLoading,
    error: membersError,
  } = useQuery(FIND_BOOK_MEMBERS, { variables: { bookId } });

  if (transferLoading || membersLoading) return <PageLoader />;

  if (transferError) throw transferError;
  if (membersError) throw membersError;

  const { label, amount, type, date, tenant, balanceParams } =
    getTransferDetailsInfo(transferData);
  const { members } = membersData.book;

  return (
    <div className="mx-4">
      <label>
        Label
        <input
          type="text"
          name="label"
          defaultValue={label}
          pattern=".{1,255}"
        />
      </label>
      <div className="flex items-baseline gap-4">
        <label>
          Amount
          {/* XXX When supporting other currencies, the "step" must be updated according to the current currency */}
          <input
            type="number"
            step="0.01"
            name="amount[amount]"
            defaultValue={amount?.amount}
            required
          />
        </label>
        <label className="flex-1">
          Currency
          <select
            name="amount[currency]"
            defaultValue={amount?.currency ?? "EUR"}
            className="w-full"
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
        <select name="type" defaultValue={type} required>
          <option value="PAYMENT">Payment</option>
          <option value="INCOME">Income</option>
          <option value="REIMBURSEMENT">Reimbursement</option>
        </select>
      </label>

      <label>
        Tenant
        <select name="tenantId" defaultValue={tenant?.id} required>
          {members.map(({ id, user }) => (
            <option key={id} value={id}>
              {user.displayName}
            </option>
          ))}
        </select>
      </label>

      <label>
        How to balance ?
        <select
          name="balanceParams[meansCode]"
          defaultValue={balanceParams?.meansCode}
          required
        >
          <option value="DIVIDE_EQUALLY">Divide equally</option>
          <option value="WEIGHT_BY_INCOME">Weight by income</option>
        </select>
        {/* TODO <button>More information</button> */}
      </label>

      <label>
        Date
        <input
          type="datetime-local"
          name="date"
          defaultValue={date ?? nowStr()}
          required
        />
      </label>
    </div>
  );
}

TransferDetails.propTypes = {
  transferData: PropTypes.object.isRequired,
  transferLoading: PropTypes.bool,
  transferError: PropTypes.object,
};

function getTransferDetailsInfo(rawData) {
  if (!rawData.moneyTransfer) return {};

  const {
    label,
    amount: rawAmount,
    type,
    date: rawDate,
    tenant,
    balanceParams,
  } = rawData.moneyTransfer;

  const date = new Date(rawDate);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return {
    label,
    amount: money.parse(rawAmount),
    type,
    date: date.toISOString().slice(0, -5),
    tenant,
    balanceParams,
  };
}

function PeerList({ transferData, transferLoading }) {
  const { bookId } = useParams();

  const { data, loading, error } = useQuery(FIND_BOOK_MEMBERS, {
    variables: { bookId },
  });

  if (loading || transferLoading) return <PageLoader />;

  // TODO
  if (error) throw error;

  const { members } = data.book;
  const peers = transferData.moneyTransfer?.peers;

  return (
    <List className="mb-4">
      <ListTitle className="flex justify-between">
        {/* TODO Add "select all" checkbox */}
        Members
        <span>Weight</span>
      </ListTitle>
      <ListScroller>
        {members.map(({ id, user }, index) => {
          const peer = peers?.find(({ member }) => member.id === id);

          // check by default for creation (aka, peers is undefined)
          // or if their is an existing peer for the member
          const defaultChecked = peers === undefined || peer !== undefined;

          const memberKey =
            peer !== undefined ? `peer-${peer.id}` : `new-${index}`;

          return (
            <ListItem key={id} className="py-2">
              <label
                htmlFor={`peers[${memberKey}][checked]`}
                className="contents"
              >
                {peer && (
                  <input
                    type="hidden"
                    name={`peers[${memberKey}][peerId]`}
                    value={peer.id}
                  />
                )}
                <input
                  type="hidden"
                  name={`peers[${memberKey}][memberId]`}
                  value={id}
                />
                <input
                  type="checkbox"
                  defaultChecked={defaultChecked}
                  name={`peers[${memberKey}][checked]`}
                  id={`peers[${id}]`}
                />
                <ListItemAvatar src={user.avatarUrl} />
                <ListItemLabel>{user.displayName}</ListItemLabel>

                <input
                  type="number"
                  step="0.01"
                  defaultValue={peer?.weight ?? "1"}
                  name={`peers[${memberKey}][weight]`}
                  className="flex-1 w-full"
                />
              </label>
            </ListItem>
          );
        })}
      </ListScroller>
    </List>
  );
}

PeerList.propTypes = {
  transferData: PropTypes.object,
  transferLoading: PropTypes.bool,
};

export function NewMoneyTransferPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [createMoneyTransfer, { loading, error }] = useMutation(
    CREATE_MONEY_TRANSFER,
    {
      update(cache, { data }) {
        const newTransfer = data.createMoneyTransfer;
        const existingTransfers = cache.readQuery({
          query: FIND_MONEY_TRANSFERS,
          variables: { bookId },
        });

        if (newTransfer && existingTransfers) {
          cache.writeQuery({
            query: FIND_MONEY_TRANSFERS,
            variables: { bookId },
            data: {
              book: {
                ...existingTransfers.book,

                moneyTransfers: [
                  ...existingTransfers.book.moneyTransfers,
                  newTransfer,
                ],
              },
            },
          });
        }
      },
    }
  );

  const handleOnSubmit = useCallback(
    async (formAttrs) => {
      const attrs = { ...formAttrs, bookId: bookId };

      await createMoneyTransfer({
        variables: { attrs },
      });

      navigate(-1);
    },
    [createMoneyTransfer, navigate, bookId]
  );

  return (
    <MoneyTransferFormPage
      title="New transfer"
      submitTitle="Create"
      onSubmit={handleOnSubmit}
      submitLoading={loading}
      submitError={error}
    />
  );
}

export function EditMoneyTransferPage() {
  const { transferId } = useParams();
  const navigate = useNavigate();

  const {
    data: transfer,
    loading: transferLoading,
    error: transferError,
  } = useQuery(GET_MONEY_TRANSFER, { variables: { id: transferId } });

  const [updateMoneyTransfer, { loading: submitLoading, error: submitError }] =
    useMutation(UPDATE_MONEY_TRANSFER);

  const handleOnSubmit = useCallback(
    async (attrs) => {
      await updateMoneyTransfer({
        variables: { transferId, attrs },
      });

      navigate(-1);
    },
    [updateMoneyTransfer, navigate, transferId]
  );

  return (
    <MoneyTransferFormPage
      title="Edit transfer"
      menu={<EditMenu />}
      transferData={transfer}
      transferLoading={transferLoading}
      transferError={transferError}
      submitTitle="Edit"
      onSubmit={handleOnSubmit}
      submitLoading={submitLoading}
      submitError={submitError}
    />
  );
}

function EditMenu() {
  const { bookId, transferId } = useParams();
  const navigate = useNavigate();

  const [deleteTransfer, { loading, error }] = useMutation(
    DELETE_MONEY_TRANSFER,
    {
      update(cache, { data }) {
        const deletedTransfer = data.deleteMoneyTransfer;
        const existingTransfers = cache.readQuery({
          query: FIND_MONEY_TRANSFERS,
          variables: { bookId },
        });

        if (deletedTransfer && existingTransfers) {
          cache.writeQuery({
            query: FIND_MONEY_TRANSFERS,
            variables: { bookId },
            data: {
              book: {
                ...existingTransfers.book,

                moneyTransfers: existingTransfers.book.moneyTransfers.filter(
                  ({ id }) => id !== deletedTransfer.id
                ),
              },
            },
          });
        }
      },
    }
  );

  const handleDelete = useCallback(async () => {
    await deleteTransfer({ variables: { transferId } });

    navigate(-1);
  }, [deleteTransfer, transferId, navigate]);

  // TODO
  if (error) throw error;
  return (
    <List element="menu">
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
