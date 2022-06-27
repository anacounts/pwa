import React from "react";
import PropTypes from "prop-types";

import "./List.css";

// # Wrapper

export function List({ className = "", children }) {
  return <div className={`list ${className}`}>{children}</div>;
}

List.propTypes = {
  className: PropTypes.string,
};

// # Title

export function ListTitle({ className = "", children }) {
  return <strong className={`list__title ${className}`}>{children}</strong>;
}

ListTitle.propTypes = {
  className: PropTypes.string,
};

// # Scroller

export function ListScroller({ element: Element = "ul", children }) {
  return (
    <Element className="list__scroller" role="list">
      {children}
    </Element>
  );
}

ListScroller.propTypes = {
  element: PropTypes.element,
};
