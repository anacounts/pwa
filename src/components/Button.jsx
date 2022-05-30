import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Button.css";

function maybeRenderLink(to, props, children) {
  if (!to) return <button {...props}>{children}</button>;

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

function buttonColorModifier(type) {
  return "button--color-" + type;
}

function Button({ children, className, color = "feature", to, ...props }) {
  const colorModifier = buttonColorModifier(color);

  return maybeRenderLink(
    to,
    { className: `button ${colorModifier} ${className ?? ""}`, ...props },
    children
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(["cta", "feature", "invisible"]),
};

export default Button;
