import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductActions from "./ProductActions";
import useCartStore from "@store/cartStore";

describe("ProductActions", () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.getState().clearCart();
  });

  const defaultProps = {
    productId: 1,
    productName: "Test Product",
    price: 29.99,
    quantityInCart: 0,
  };

  describe("rendering", () => {
    it("renders the price label", () => {
      render(<ProductActions {...defaultProps} />);

      const priceLabel = screen.getByText("PRICE");
      expect(priceLabel).toBeInTheDocument();
      expect(priceLabel).toHaveClass("product-actions__price-label");
    });

    it("renders the formatted price", () => {
      render(<ProductActions {...defaultProps} />);

      const price = screen.getByText("$29.99");
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass("product-actions__price");
    });

    it("formats price with 2 decimal places for decimal values", () => {
      render(<ProductActions {...defaultProps} price={19.5} />);

      const price = screen.getByText("$19.50");
      expect(price).toBeInTheDocument();
    });

    it("formats price with 2 decimal places for integer values", () => {
      render(<ProductActions {...defaultProps} price={100} />);

      const price = screen.getByText("$100.00");
      expect(price).toBeInTheDocument();
    });

    it("formats price correctly for large values", () => {
      render(<ProductActions {...defaultProps} price={999.99} />);

      const price = screen.getByText("$999.99");
      expect(price).toBeInTheDocument();
    });
  });

  describe("when product is not in cart", () => {
    it("renders ADD TO CART button", () => {
      render(<ProductActions {...defaultProps} quantityInCart={0} />);

      const addButton = screen.getByRole("button", {
        name: "Add Test Product to cart",
      });
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent("ADD TO CART");
    });

    it("does not render REMOVE FROM CART button", () => {
      render(<ProductActions {...defaultProps} quantityInCart={0} />);

      const removeButton = screen.queryByRole("button", {
        name: "Remove Test Product from cart",
      });
      expect(removeButton).not.toBeInTheDocument();
    });

    it("adds product to cart when ADD TO CART button is clicked", async () => {
      render(<ProductActions {...defaultProps} quantityInCart={0} />);

      const addButton = screen.getByRole("button", {
        name: "Add Test Product to cart",
      });
      await userEvent.click(addButton);

      // Verify item was added to store
      expect(useCartStore.getState().isInCart(defaultProps.productId)).toBe(
        true
      );
    });
  });

  describe("when product is in cart", () => {
    it("renders REMOVE FROM CART button", () => {
      render(<ProductActions {...defaultProps} quantityInCart={1} />);

      const removeButton = screen.getByRole("button", {
        name: "Remove Test Product from cart",
      });
      expect(removeButton).toBeInTheDocument();
      expect(removeButton).toHaveTextContent("REMOVE FROM CART");
    });

    it("does not render ADD TO CART button", () => {
      render(<ProductActions {...defaultProps} quantityInCart={1} />);

      const addButton = screen.queryByRole("button", {
        name: "Add Test Product to cart",
      });
      expect(addButton).not.toBeInTheDocument();
    });

    it("renders REMOVE FROM CART button when quantityInCart is greater than 0", () => {
      render(<ProductActions {...defaultProps} quantityInCart={1} />);

      const removeButton = screen.getByRole("button", {
        name: "Remove Test Product from cart",
      });
      expect(removeButton).toBeInTheDocument();
    });

    it("removes product from cart when REMOVE FROM CART button is clicked", async () => {
      // First add the item to the cart
      useCartStore.getState().addToCart(defaultProps.productId);

      render(<ProductActions {...defaultProps} quantityInCart={1} />);

      const removeButton = screen.getByRole("button", {
        name: "Remove Test Product from cart",
      });
      await userEvent.click(removeButton);

      // Verify item was removed from store
      expect(useCartStore.getState().isInCart(defaultProps.productId)).toBe(
        false
      );
    });
  });
});
