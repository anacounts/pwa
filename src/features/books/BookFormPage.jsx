import React, { useCallback } from "react";
import PropTypes from "prop-types";

import SimpleLayout from "../../layouts/SimpleLayout";

import Button from "../../components/Button";
import Loader, { PageLoader } from "../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK, UPDATE_BOOK } from "./mutations";
import { GET_BOOKS, GET_BOOK_DETAILS } from "./queries";

import * as form from "../../utils/form";

import "./BookFormPage.css";

function BookFormPage({
  title,
  bookData,
  bookLoading,
  bookError,
  submitTitle,
  onSubmit,
  submitLoading,
  submitError,
}) {
  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const objectData = form.toObject(formData);

      const attrs = {
        name: objectData.name,
        defaultBalanceParams: {
          meansCode: objectData.defaultBalanceParams.meansCode,
          params: "{}",
        },
      };

      onSubmit(attrs);
    },
    [onSubmit]
  );

  if (bookLoading) return <PageLoader />;

  // TODO
  if (bookError) throw bookError;

  const { name, defaultBalanceParams } = bookData?.book ?? {};

  return (
    <SimpleLayout title={title}>
      <form className="book-form-page" onSubmit={handleOnSubmit}>
        <label>
          Name
          <input
            name="name"
            placeholder="A new awesome book !"
            defaultValue={name}
            required
            disabled={submitLoading}
          />
        </label>

        <label>
          How to balance by default ?
          <select
            name="defaultBalanceParams[meansCode]"
            defaultValue={defaultBalanceParams?.meansCode}
            required
            disabled={submitLoading}
          >
            <option value="DIVIDE_EQUALLY">Divide equally</option>
            <option value="WEIGHT_BY_INCOME">Weight by income</option>
          </select>
          {/* TODO <button>More information</button> */}
        </label>

        <div className="book-form-page__submit-button">
          <Button color="cta" className="mr-4" disabled={submitLoading}>
            {submitTitle}
          </Button>
          {submitLoading && <Loader size="sm" />}
          {submitError && <span>{submitError.message}</span>}
        </div>
      </form>
    </SimpleLayout>
  );
}

BookFormPage.propTypes = {
  title: PropTypes.string.isRequired,
  bookData: PropTypes.object,
  bookLoading: PropTypes.bool,
  bookError: PropTypes.object,
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLoading: PropTypes.bool,
  submitError: PropTypes.object,
};

export function NewBookPage() {
  const navigate = useNavigate();

  const [createBook, { loading: submitLoading, error: submitError }] =
    useMutation(CREATE_BOOK, {
      refetchQueries: [GET_BOOKS],
    });

  const handleSubmit = useCallback(
    async (attrs) => {
      const { data } = await createBook({ variables: { attrs } });

      navigate(`/books/${data.createBook.id}`, { replace: true });
    },
    [createBook, navigate]
  );

  return (
    <BookFormPage
      title="New book"
      submitTitle="Create book"
      onSubmit={handleSubmit}
      submitLoading={submitLoading}
      submitError={submitError}
    />
  );
}

export function EditBookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const {
    data: bookData,
    loading: bookLoading,
    error: bookError,
  } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: bookId },
  });

  const [updateBook, { loading: submitLoading, error: submitError }] =
    useMutation(UPDATE_BOOK);

  const handleSubmit = useCallback(
    (attrs) => {
      updateBook({ variables: { bookId, attrs } });

      navigate(-1);
    },
    [updateBook, bookId, navigate]
  );

  return (
    <BookFormPage
      title="Edit book"
      bookData={bookData}
      bookLoading={bookLoading}
      bookError={bookError}
      submitTitle="Edit book"
      onSubmit={handleSubmit}
      submitLoading={submitLoading}
      submitError={submitError}
    />
  );
}
