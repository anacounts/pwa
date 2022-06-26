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

export function BottomNavButton({ to, active = false, icon, label }) {
  const activeClass = active ? "bottom-nav__item--active" : "";

  return (
    <li className={`bottom-nav__item ${activeClass}`}>
      <Link to={to} className="bottom-nav__link">
        <Icon name={icon} className="bottom-nav__item-icon" />
        <span>{label}</span>
      </Link>
    </li>
  );
}

BottomNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
