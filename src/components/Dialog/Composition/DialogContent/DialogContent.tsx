import React, { forwardRef } from "react";
import "./DialogContent.scss";

type TDialogContent = {
  children: React.ReactNode;
};

const DialogContent = forwardRef<HTMLDivElement, TDialogContent>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        data-testid="dialog-content"
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

export default DialogContent;
