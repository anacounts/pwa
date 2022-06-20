import React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

function Icon({ className, name, alt, ...otherProps }) {
  return (
    <svg
      className={`icon ${className ?? ""}`}
      fill="currentColor"
      role="img"
      aria-hidden={!alt}
      {...otherProps}
    >
      {alt && <title>{alt}</title>}
      <use href={`/assets/icons/sprite.svg#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  alt: PropTypes.string,
};

export default Icon;
