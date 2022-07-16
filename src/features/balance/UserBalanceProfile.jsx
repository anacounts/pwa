import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import SimpleLayout from "../../layouts/SimpleLayout";

import { Accordion, AccordionItem } from "../../components/Accordion";
import Button from "../../components/Button";

import { useMutation, useQuery } from "@apollo/client";
import { BALANCE_USER_PARAMS } from "./queries";
import { SET_BALANCE_USER_PARAMS } from "./mutations";

import * as form from "../../utils/form";
import Loader, { PageLoader } from "../../components/Loader";

function UserBalanceProfile() {
  const { data, loading, error } = useQuery(BALANCE_USER_PARAMS);

  const params = useMemo(() => {
    if (!data) return;

    return data.balanceUserParams.reduce(
      (userParams, { meansCode, params }) => ({
        ...userParams,
        [meansCode]: params,
      }),
      {}
    );
  }, [data]);

  if (loading) return <PageLoader />;
  // TODO
  if (error) throw error;

  return (
    <SimpleLayout title="Balance profile">
      <Accordion>
        <AccordionItem title="Divide equally">
          <NoConfig />
        </AccordionItem>
        <AccordionItem title="Weight by incomes">
          <WeightByIncome currentParams={params["WEIGHT_BY_INCOME"]} />
        </AccordionItem>
      </Accordion>
    </SimpleLayout>
  );
}

export default UserBalanceProfile;

function NoConfig() {
  return (
    <div className="mx-4">No configuration necessary. You're all set up !</div>
  );
}

function WeightByIncome({ currentParams }) {
  const [setBalanceUserParams, { data, loading, error }] = useMutation(
    SET_BALANCE_USER_PARAMS
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const objectData = form.toObject(formData);

      const variables = {
        meansCode: "WEIGHT_BY_INCOME",
        params: JSON.stringify({
          income: Number.parseInt(objectData.params.income, 10),
        }),
      };

      setBalanceUserParams({ variables });
    },
    [setBalanceUserParams]
  );

  return (
    <form className="mx-4" onSubmit={handleSubmit}>
      <label>
        Last year incomes
        <input
          type="number"
          name="params[income]"
          step="0.01"
          placeholder="XXX.XX"
          defaultValue={currentParams?.income}
        />
        Indicate your income from last year. To do so, we adivise you to go on
        your bank website, and sum all incomes from 1 year ago to today.
      </label>

      <Button>Update</Button>
      {loading && <Loader className="ml-4" />}
      {error && <div className="text-error">{error.message}</div>}
      {data && <span className="ml-4">Successfully updated !</span>}
    </form>
  );
}

WeightByIncome.propTypes = {
  currentParams: PropTypes.shape({ income: PropTypes.number.isRequired }),
};
