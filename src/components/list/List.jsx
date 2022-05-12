import React from "react";
import PropTypes from "prop-types";

import "./List.css";

// # Wrapper

export function List({ children }) {
  return <div className="list">{children}</div>;
}

List.propTypes = {
  component: PropTypes.object,
};

// # Title

export function ListTitle({ children }) {
  return <strong className="list__title">{children}</strong>;
}

// # Scroller

export function ListScroller({ element: Element = "ul", children }) {
  return <Element className="list__scroller">{children}</Element>;
}

ListScroller.propTypes = {
  component: PropTypes.object,
};
