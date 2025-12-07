import { Button } from "@components/Button";
import "./DialogActions.scss";

type TDialogActions = {
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function DialogActions({
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: TDialogActions) {
  return (
    <div className="dialog-actions">
      <Button.Outlined className="dialog-actions__cancel" onClick={onCancel}>
        {cancelText}
      </Button.Outlined>
      <Button.Contained className="dialog-actions__confirm" onClick={onConfirm}>
        {confirmText}
      </Button.Contained>
    </div>
  );
}

export default DialogActions;
