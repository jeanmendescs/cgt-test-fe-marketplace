import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultProps = {
    isOpen: true,
    title: "Test Title",
    message: "Test message",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    dialogRef: React.createRef<HTMLDivElement>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = "";
  });

  afterEach(() => {
    // Clean up body overflow
    document.body.style.overflow = "";
  });

  it("does not render when isOpen is false", () => {
    render(<ConfirmDialog {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays title and message", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Test Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("displays custom button texts", () => {
    render(
      <ConfirmDialog {...defaultProps} confirmText="Delete" cancelText="Keep" />
    );

    expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("uses default button texts when not provided", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Title"
        message="Message"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const handleConfirm = jest.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={handleConfirm} />);

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    userEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const handleCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when clicking on overlay", () => {
    const handleCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    const overlay = screen.getByRole("dialog");
    userEvent.click(overlay);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when pressing Escape key", () => {
    const handleCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    userEvent.keyboard("{Escape}");

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("prevents body scroll when dialog is open", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when dialog is closed", () => {
    const { rerender } = render(<ConfirmDialog {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<ConfirmDialog {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe("");
  });

  it("has correct ARIA attributes", () => {
    render(<ConfirmDialog {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "confirm-dialog-title");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "confirm-dialog-message"
    );
  });

  it("focuses dialog content when opened", async () => {
    render(<ConfirmDialog {...defaultProps} />);

    await waitFor(() => {
      const dialogContent = screen.getByTestId("dialog-content");
      expect(dialogContent).toHaveFocus();
    });
  });

  it("does not call onCancel when clicking inside dialog content", () => {
    const handleCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    const dialogContent = screen.getByTestId("dialog-content");
    if (dialogContent) {
      userEvent.click(dialogContent);
    }

    expect(handleCancel).not.toHaveBeenCalled();
  });

  it("cleans up event listeners on unmount", () => {
    const handleCancel = jest.fn();
    const { unmount } = render(
      <ConfirmDialog {...defaultProps} onCancel={handleCancel} />
    );

    unmount();

    // Try to trigger escape key after unmount
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    // Should not call onCancel after unmount
    expect(handleCancel).not.toHaveBeenCalled();
  });
});
