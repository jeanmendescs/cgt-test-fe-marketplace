import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";

describe("ProductInfo", () => {
  const defaultProps = {
    name: "Test Product Name",
    description: "This is a test product description",
  };

  describe("rendering", () => {
    it("renders the product name", () => {
      render(<ProductInfo {...defaultProps} />);

      const name = screen.getByText("Test Product Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveClass("product-info__name");
    });

    it("renders the product description", () => {
      render(<ProductInfo {...defaultProps} />);

      const description = screen.getByText(
        "This is a test product description"
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("product-info__description");
    });
  });
});
