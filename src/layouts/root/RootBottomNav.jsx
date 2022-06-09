import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../components/Icon";

import "./RootBottomNav.css";

function getActiveClass(activeItem, currentItem) {
  return activeItem === currentItem ? " app-bottom-nav__item--active" : "";
}

function RootBottomNav() {
  const location = useLocation();

  const activeItem = useMemo(() => {
    return location.pathname.startsWith("/profile") ? "profile" : "books";
  }, [location.pathname]);

  return (
    <nav className="app-bottom-nav">
      <menu className="app-bottom-nav__menu">
        <li
          className={
            "app-bottom-nav__item" + getActiveClass(activeItem, "books")
          }
        >
          <Link to="/" className="app-bottom-nav__link">
            <Icon name="book" className="app-bottom-nav__item-icon" />
            <span>Books</span>
          </Link>
        </li>
        <li
          className={
            "app-bottom-nav__item" + getActiveClass(activeItem, "profile")
          }
        >
          <Link to="/profile" className="app-bottom-nav__link">
            <Icon name="account" className="app-bottom-nav__item-icon" />
            <span>Profile</span>
          </Link>
        </li>
      </menu>
    </nav>
  );
}

export default RootBottomNav;
