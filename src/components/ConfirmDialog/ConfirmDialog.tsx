import { useEffect, useRef } from "react";
import { Dialog } from "@components/Dialog/Dialog";

type TConfirmDialog = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  dialogRef?: React.RefObject<HTMLDivElement>;
};

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  dialogRef,
}: TConfirmDialog) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = dialogRef || internalRef;

  // Handle body scroll prevention
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  // Handle focus management
  useEffect(() => {
    if (isOpen && ref.current) {
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
  }, [isOpen, ref]);

  if (!isOpen) return null;

  return (
    <Dialog.Overlay
      onClick={onCancel}
      ariaLabelledBy="confirm-dialog-title"
      ariaDescribedBy="confirm-dialog-message"
    >
      <Dialog.Content ref={ref}>
        <Dialog.Body>
          <h2 id="confirm-dialog-title">{title}</h2>
          <p id="confirm-dialog-message">{message}</p>
        </Dialog.Body>
        <Dialog.Actions
          confirmText={confirmText}
          cancelText={cancelText}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Dialog.Content>
    </Dialog.Overlay>
  );
}

export default ConfirmDialog;
