import { render, screen } from "@testing-library/react";
import ContainedButton from "./ContainedButton";

describe("ContainedButton", () => {
  it("renders the button element", () => {
    render(<ContainedButton>Click me</ContainedButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(<ContainedButton>Test Button</ContainedButton>);

    const button = screen.getByText("Test Button");
    expect(button).toBeInTheDocument();
  });

  it("applies the contained-button className", () => {
    render(<ContainedButton>Button</ContainedButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("contained-button");
  });

  it("merges custom className with contained-button", () => {
    render(<ContainedButton className="custom-class">Button</ContainedButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("contained-button");
    expect(button).toHaveClass("custom-class");
  });
});
