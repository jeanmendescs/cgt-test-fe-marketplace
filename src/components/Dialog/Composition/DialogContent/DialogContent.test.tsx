import { render, screen } from "@testing-library/react";
import DialogContent from "./DialogContent";
import userEvent from "@testing-library/user-event";

describe("DialogContent", () => {
  it("renders children correctly", () => {
    render(
      <DialogContent>
        <div>Test Content</div>
      </DialogContent>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct className", () => {
    render(
      <DialogContent>
        <div>Content</div>
      </DialogContent>
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("dialog-content");
  });

  it("has tabIndex of -1", () => {
    render(
      <DialogContent>
        <div>Content</div>
      </DialogContent>
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveAttribute("tabIndex", "-1");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <DialogContent ref={ref}>
        <div>Content</div>
      </DialogContent>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("dialog-content");
  });

  it("stops propagation when clicked", () => {
    const overlayClick = jest.fn();

    render(
      <div onClick={overlayClick}>
        <DialogContent>
          <div>Content</div>
        </DialogContent>
      </div>
    );

    const content = screen.getByTestId("dialog-content");
    userEvent.click(content as HTMLDivElement);

    // stopPropagation should prevent overlay click
    expect(overlayClick).not.toHaveBeenCalled();
  });
});
