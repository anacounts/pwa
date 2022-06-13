import React, { useId, useState } from "react";
import PropTypes from "prop-types";

import "./Dropdown.css";

function Dropdown({ toggle, menu }) {
  const [open, setOpen] = useState(false);

  const toggleId = useId();

  return (
    <div
      className={`dropdown ${open ? "dropdown--open" : ""}`}
      aria-expanded={open}
    >
      <button
        className="dropdown__toggle"
        onClick={() => setOpen(!open)}
        id={toggleId}
      >
        {toggle}
      </button>
      <menu className="dropdown__menu" aria-labelledby={toggleId}>
        {menu}
      </menu>
    </div>
  );
}

Dropdown.propTypes = {
  toggle: PropTypes.element.isRequired,
  menu: PropTypes.element.isRequired,
};

export default Dropdown;
