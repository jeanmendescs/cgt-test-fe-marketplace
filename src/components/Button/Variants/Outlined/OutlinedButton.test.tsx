import { render, screen } from "@testing-library/react";
import OutlinedButton from "./OutlinedButton";

describe("OutlinedButton", () => {
  it("renders the button element", () => {
    render(<OutlinedButton>Click me</OutlinedButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(<OutlinedButton>Test Button</OutlinedButton>);

    const button = screen.getByText("Test Button");
    expect(button).toBeInTheDocument();
  });

  it("applies the outlined-button className", () => {
    render(<OutlinedButton>Button</OutlinedButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("outlined-button");
  });

  it("merges custom className with outlined-button", () => {
    render(<OutlinedButton className="custom-class">Button</OutlinedButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("outlined-button");
    expect(button).toHaveClass("custom-class");
  });
});
