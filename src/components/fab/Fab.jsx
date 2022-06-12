import { maybeRenderLink } from "../../utils/react";

import "./Fab.css";

function Fab({ children, to, ...props }) {
  return maybeRenderLink(to, { className: "fab", ...props }, children);
}

export default Fab;
