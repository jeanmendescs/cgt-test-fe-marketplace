import { render, screen } from "@testing-library/react";
import DialogBody from "./DialogBody";

describe("DialogBody", () => {
  it("renders children correctly", () => {
    render(<DialogBody>Test Content</DialogBody>);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    render(<DialogBody>Content</DialogBody>);

    const body = screen.getByText("Content");
    expect(body.tagName).toBe("DIV");
  });

  it("renders multiple children correctly", () => {
    render(
      <DialogBody>
        <h2>Title</h2>
        <p>Message</p>
      </DialogBody>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });
});
