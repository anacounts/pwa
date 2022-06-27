import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./BottomNav.css";
import Icon from "./Icon";

export function BottomNav({ children }) {
  return (
    <nav className="bottom-nav">
      <menu className="bottom-nav__menu">{children}</menu>
    </nav>
  );
}

export function BottomNavButton({ icon, label, to, active = false }) {
  const activeClass = active ? "bottom-nav__item--active" : "";

  return (
    <li className={`bottom-nav__item ${activeClass}`}>
      <Link to={to} className="bottom-nav__link" replace>
        <Icon name={icon} className="bottom-nav__item-icon" />
        <span>{label}</span>
      </Link>
    </li>
  );
}

BottomNavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
