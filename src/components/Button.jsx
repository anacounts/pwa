import PropTypes from "prop-types";

import { maybeRenderLink } from "../utils/react";

import "./Button.css";

function buttonColorModifier(type) {
  return "button--color-" + type;
}

function Button({ children, className = "", color = "feature", to, ...props }) {
  const colorModifier = buttonColorModifier(color);

  return maybeRenderLink(
    to,
    { className: `button ${colorModifier} ${className}`, ...props },
    children
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(["cta", "feature", "invisible"]),
};

export default Button;
