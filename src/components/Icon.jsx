import React from "react";

import "./Icon.css";

function Icon({ className, name, alt, ...otherProps }) {
  return (
    <svg
      className={`icon ${className ?? ""}`}
      fill="currentColor"
      {...otherProps}
    >
      {alt && <title>{alt}</title>}
      <use href={`/assets/icons/sprite.svg#${name}`} />
    </svg>
  );
}

export default Icon;
