import React from "react";
import "./DialogBody.scss";

type TDialogBody = {
  children: React.ReactNode;
};

function DialogBody({ children }: TDialogBody) {
  return (
    <div data-testid="dialog-body" className="dialog-body">
      {children}
    </div>
  );
}

export default DialogBody;
