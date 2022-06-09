import { Link } from "react-router-dom";

import "./RootHeader.css";

function RootHeader() {
  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="app-header__title">
          <strong>Anacounts</strong>
        </Link>
      </nav>
    </header>
  );
}

export default RootHeader;
