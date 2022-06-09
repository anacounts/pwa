import React from "react";
import { Link } from "react-router-dom";

export function maybeRenderLink(to, props, children) {
  if (!to) return <button {...props}>{children}</button>;

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
