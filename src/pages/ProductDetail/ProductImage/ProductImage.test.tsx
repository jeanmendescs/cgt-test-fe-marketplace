import { render, screen } from "@testing-library/react";
import ProductImage from "./ProductImage";

describe("ProductImage", () => {
  const defaultProps = {
    image: "product-1.jpg",
    alt: "Test product image",
    quantityInCart: 0,
  };

  describe("rendering", () => {
    it("renders image element with src attribute", () => {
      render(<ProductImage {...defaultProps} />);

      const image = screen.getByAltText("Test product image");
      expect(image).toHaveAttribute("src");
    });
  });

  describe("badge rendering", () => {
    it("does not render badge when quantityInCart is 0", () => {
      render(<ProductImage {...defaultProps} quantityInCart={0} />);

      const badge = screen.queryByText("0");
      expect(badge).not.toBeInTheDocument();
    });

    it("does not render badge when quantityInCart is negative", () => {
      render(<ProductImage {...defaultProps} quantityInCart={-1} />);

      const badge = screen.queryByText("-1");
      expect(badge).not.toBeInTheDocument();
    });

    it("renders badge when quantityInCart is greater than 0", () => {
      render(<ProductImage {...defaultProps} quantityInCart={1} />);

      const badge = screen.getByText("1");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("product-image__badge");
    });
  });
});
