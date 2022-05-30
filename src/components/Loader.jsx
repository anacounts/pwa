import React from "react";

import "./Loader.css";

function loaderColorModifier(color) {
  return "loader--color-" + color;
}

function loaderSizeModifier(size) {
  return "loader--size-" + size;
}

function Loader({ color = "theme", size = "base", className }) {
  const colorModifier = loaderColorModifier(color);
  const sizeModifier = loaderSizeModifier(size);

  return (
    <span
      className={`loader ${colorModifier} ${sizeModifier} ${className ?? ""}`}
    />
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
