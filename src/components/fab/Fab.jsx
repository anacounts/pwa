import React from "react";

import "./Fab.css";

function Fab({ children, ...buttonProps }) {
  return (
    <button className="fab" {...buttonProps}>
      {children}
    </button>
  );
}

export default Fab;
