import React from "react";

import "./FabContainer.css";

function FabContainer({ children }) {
  const withListItems = React.Children.map(children, (child) => (
    <li>{child}</li>
  ));
  return <menu className="fab-container">{withListItems}</menu>;
}

export default FabContainer;
