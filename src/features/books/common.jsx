import React, { useMemo } from "react";
import { BottomNav, BottomNavButton } from "../../components/BottomNav";

import { useLocation, useParams } from "react-router-dom";

export function BookBottomNav() {
  const location = useLocation();

  const activeItem = useMemo(() => {
    return location.pathname.endsWith("/details") ? "details" : "transfers";
  }, [location]);

  const { bookId } = useParams();

  return (
    <BottomNav>
      <BottomNavButton
        icon="format-list-bulleted"
        label="Details"
        to={`/books/${bookId}`}
        active={activeItem === "details"}
      />
      <BottomNavButton
        icon="swap-horizontal"
        label="Transfers"
        to={`/books/${bookId}/transfers`}
        active={activeItem === "transfers"}
      />
    </BottomNav>
  );
}
