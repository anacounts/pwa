import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

import SimpleLayout from "../../layouts/SimpleLayout";

import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "./mutations";
import { GET_BOOKS } from "./queries";

import * as form from "../../utils/form";

import "./NewBookPage.css";

function NewBookPage() {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const objectData = form.toObject(formData);

      const attrs = {
        name: objectData.name,
        balanceParams: {
          meansCode: objectData.balanceParams.meansCode,
          params: "{}",
        },
      };

      createBook({ variables: { attrs } });
    },
    [createBook]
  );

  return (
    <SimpleLayout title="New book">
      <form className="new-book-page" onSubmit={handleOnSubmit}>
        <label>
          Name
          <input
            name="name"
            placeholder="New book"
            required
            disabled={loading}
          />
        </label>

        <label>
          How to balance by default ?
          <select name="balanceParams[meansCode]" required>
            <option value="DIVIDE_EQUALLY">Divide equally</option>
          </select>
          {/* TODO <button>More information</button> */}
        </label>

        <div className="new-book-page__submit-button">
          <Button color="cta" className="mr-4" disabled={loading}>
            Create book
          </Button>
          {loading && <Loader size="sm" />}
          {error && <span>{error.message}</span>}
          {data && (
            <span>
              Book successfully created ! <br />
              <Link to={`/books/${data.createBook.id}`} replace>
                Go to your book !
              </Link>
            </span>
          )}
        </div>
      </form>
    </SimpleLayout>
  );
}

export default NewBookPage;
