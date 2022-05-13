import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "./Modal.css";

function Modal({ open, children, onBackdropClick }) {
  const handleBackdropClick = useCallback(
    (event) => {
      if (event.currentTarget === event.target) onBackdropClick?.(event);
    },
    [onBackdropClick]
  );

  return (
    <div
      className={`modal ${open ? "modal--open" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="modal__dialog" role="dialog">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onBackdropClick: PropTypes.func,
};

export function ModalHeader({ children }) {
  return <header className="modal__header">{children}</header>;
}

export function ModalTitle({ children }) {
  return <h3 className="modal__title">{children}</h3>;
}

export function ModalBody({ children }) {
  return <div className="modal__body">{children}</div>;
}

export default Modal;
