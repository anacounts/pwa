import React, { useState } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";

import "./Accordion.css";

export function Accordion({ children }) {
  return <div className="accordion">{children}</div>;
}

Accordion.propTypes = {};

export function AccordionItem({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      className="accordion__item"
      open={defaultOpen}
      onToggle={(e) => setOpen(e.target.open)}
    >
      <summary className="accordion__header">
        <strong className="accordion__title">{title}</strong>
        <Icon name={open ? "chevron-up" : "chevron-down"} />
      </summary>
      {children}
    </details>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
