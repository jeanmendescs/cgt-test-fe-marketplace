import { useCallback, useEffect, useRef, useState } from "react";

function useDialog() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      // Prevent body scroll when dialog is open
      document.body.style.overflow = "hidden";
      // Focus the dialog for accessibility
      dialogRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDialogOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDialogOpen) {
        handleClose();
      }
    };

    if (isDialogOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDialogOpen, handleClose]);

  return {
    onOpen: handleOpen,
    onClose: handleClose,
    isDialogOpen,
    dialogRef,
  };
}

export default useDialog;
