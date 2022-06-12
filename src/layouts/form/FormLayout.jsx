import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import Icon from "../../components/Icon";

import { useNavigate } from "react-router-dom";

function FormLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <>
      <header className="app-header">
        <Button color="invisible" onClick={() => navigate(-1)}>
          <Icon name="arrow-left" alt="Go back" className="app-header__icon" />
        </Button>
        <strong className="app-header__title">{title}</strong>
      </header>
      <main className="app-layout__main">{children}</main>
    </>
  );
}

FormLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormLayout;
