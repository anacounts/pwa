import React from "react";
import { useNavigate } from "react-router-dom";

import { useFormLayout } from "./context";

import Button from "../../components/Button";
import Icon from "../../components/Icon";

function FormHeader() {
  const navigate = useNavigate();

  const { title } = useFormLayout();

  return (
    <header className="app-header">
      <Button color="invisible" onClick={() => navigate(-1)}>
        <Icon name="arrow-left" alt="Go back" className="app-header__icon" />
      </Button>
      <strong className="app-header__title">{title}</strong>
    </header>
  );
}

export default FormHeader;
