import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogActions from "./DialogActions";

describe("DialogActions", () => {
  const defaultProps = {
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cancel and confirm buttons", () => {
    render(<DialogActions {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("displays custom button texts", () => {
    render(
      <DialogActions
        confirmText="Delete"
        cancelText="Keep"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const handleCancel = jest.fn();
    render(<DialogActions {...defaultProps} onCancel={handleCancel} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const handleConfirm = jest.fn();
    render(<DialogActions {...defaultProps} onConfirm={handleConfirm} />);

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    userEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
