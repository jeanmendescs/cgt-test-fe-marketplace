import { render, screen } from "@testing-library/react";
import DialogOverlay from "./DialogOverlay";

describe("DialogOverlay", () => {
  it("renders children correctly", () => {
    render(
      <DialogOverlay onClick={jest.fn()}>
        <div>Test Content</div>
      </DialogOverlay>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has dialog role and aria-modal attribute", () => {
    render(
      <DialogOverlay onClick={jest.fn()}>
        <div>Content</div>
      </DialogOverlay>
    );

    const overlay = screen.getByRole("dialog");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("aria-modal", "true");
  });

  it("applies aria-labelledby when provided", () => {
    render(
      <DialogOverlay onClick={jest.fn()} ariaLabelledBy="dialog-title">
        <div>Content</div>
      </DialogOverlay>
    );

    const overlay = screen.getByRole("dialog");
    expect(overlay).toHaveAttribute("aria-labelledby", "dialog-title");
  });

  it("applies aria-describedby when provided", () => {
    render(
      <DialogOverlay onClick={jest.fn()} ariaDescribedBy="dialog-message">
        <div>Content</div>
      </DialogOverlay>
    );

    const overlay = screen.getByRole("dialog");
    expect(overlay).toHaveAttribute("aria-describedby", "dialog-message");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <DialogOverlay onClick={handleClick}>
        <div>Content</div>
      </DialogOverlay>
    );

    const overlay = screen.getByRole("dialog");
    overlay.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct className", () => {
    render(
      <DialogOverlay onClick={jest.fn()}>
        <div>Content</div>
      </DialogOverlay>
    );

    const overlay = screen.getByRole("dialog");
    expect(overlay).toHaveClass("dialog-overlay");
  });
});
