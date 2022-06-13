import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./ListItem.css";

function maybeWrapChildrenInLink(children, to) {
  if (to) {
    return (
      <Link className="list-item__link" to={to}>
        {children}
      </Link>
    );
  }
  return children;
}

export function ListItem({ to, className = "", children, ...itemProps }) {
  return (
    <li className={`list-item ${className}`} {...itemProps}>
      {maybeWrapChildrenInLink(children, to)}
    </li>
  );
}

ListItem.propTypes = {
  to: PropTypes.string,
};

export function ListItemAvatar({
  src = "/assets/img/book-default-avatar.png",
  alt = "",
}) {
  return <img className="list-item__avatar" src={src} alt={alt} />;
}

ListItemAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export function ListItemLabel({ children }) {
  return <div className="list-item__label">{children}</div>;
}
