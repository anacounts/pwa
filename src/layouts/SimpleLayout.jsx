import React from "react";
import PropTypes from "prop-types";

import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Icon from "../components/Icon";

import { useNavigate } from "react-router-dom";

function SimpleLayout({ title, menu, children }) {
  const navigate = useNavigate();

  return (
    <>
      <header className="app-header">
        <Button color="invisible" onClick={() => navigate(-1)}>
          <Icon name="arrow-left" alt="Go back" className="app-header__icon" />
        </Button>
        <strong className="app-header__title">{title}</strong>
        {menu && (
          <Dropdown
            toggle={<Icon name="dots-vertical" className="app-header__icon" />}
            menu={menu}
          />
        )}
      </header>
      <main>{children}</main>
    </>
  );
}

SimpleLayout.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.element,
};

export default SimpleLayout;
