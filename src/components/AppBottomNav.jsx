import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import SvgIcon from "./SvgIcon";

import "./AppBottomNav.css";

function getActiveClass(activeItem, currentItem) {
  return activeItem === currentItem ? " app-bottom-nav__item--active" : "";
}

function AppBottomNav() {
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
            <SvgIcon className="app-bottom-nav__item-icon">
              {/* icon:book */}
              <path
                fill="currentColor"
                d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z"
              />
            </SvgIcon>
            <span>Books</span>
          </Link>
        </li>
        <li
          className={
            "app-bottom-nav__item" + getActiveClass(activeItem, "profile")
          }
        >
          <Link to="/profile" className="app-bottom-nav__link">
            <SvgIcon className="app-bottom-nav__item-icon">
              {/* icon:account */}
              <path
                fill="currentColor"
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </SvgIcon>
            <span>Profile</span>
          </Link>
        </li>
      </menu>
    </nav>
  );
}

export default AppBottomNav;
