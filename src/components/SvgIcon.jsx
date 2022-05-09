import React from "react";

import "./SvgIcon.css";

function SvgIcon({ children, className }) {
  return (
    <svg className={"svg-icon " + className} viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

export default SvgIcon;
