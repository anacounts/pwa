import React from "react";

import "./Loader.css";

function Loader({ color = "theme", size = "base" }) {
  return (
    <span className={`loader loader--color-${color} loader--size-${size}`} />
  );
}

export function PageLoader() {
  return (
    <div className="page-loader">
      <Loader />
    </div>
  );
}

export default Loader;
