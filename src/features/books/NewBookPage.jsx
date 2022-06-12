import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { GET_BOOKS } from "./queries";

import { useTitle } from "../../layouts/form/context";

import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "./mutations";

import "./NewBookPage.css";

function NewBookPage() {
  useTitle("New book");

  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");

      createBook({ variables: { attrs: { name } } });
    },
    [createBook]
  );

  return (
    <form className="new-book-page" onSubmit={handleOnSubmit}>
      <label>
        Name
        <input name="name" placeholder="New book" required />
      </label>

      <div className="new-book-page__submit-button">
        <Button color="cta" className="mr-4">
          Create book
        </Button>
        {loading && <Loader size="sm" />}
        {error && <span>{error.message}</span>}
        {data && (
          <span>
            Book successfully created ! <br />
            <Link to={`/books/${data.createBook.id}`}>Go to your book !</Link>
          </span>
        )}
      </div>
    </form>
  );
}

export default NewBookPage;