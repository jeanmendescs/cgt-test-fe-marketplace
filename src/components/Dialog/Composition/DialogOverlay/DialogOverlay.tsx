import React from "react";
import "./DialogOverlay.scss";

type TDialogOverlay = {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

function DialogOverlay({
  children,
  onClick,
  ariaLabelledBy,
  ariaDescribedBy,
}: TDialogOverlay) {
  return (
    <div
      className="dialog-overlay"
      onClick={onClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </div>
  );
}

export default DialogOverlay;
