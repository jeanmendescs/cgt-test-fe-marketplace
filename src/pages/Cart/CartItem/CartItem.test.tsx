import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";
import useCartStore from "@store/cartStore";

describe("CartItem", () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.getState().clearCart();
  });

  const defaultProps = {
    id: 1,
    name: "Test Product Name",
    price: 29.99,
    image: "product-1.jpg",
    alt: "Test product image",
    description: "Test description",
    src: "/assets/images/product-1.jpg",
  };

  describe("rendering", () => {
    it("renders the product image with correct alt text", () => {
      render(<CartItem {...defaultProps} />);

      const image = screen.getByAltText("Test product image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveClass("cart-item__image");
      expect(image).toHaveAttribute("src");
    });

    it("renders the product name", () => {
      render(<CartItem {...defaultProps} />);

      const name = screen.getByText("Test Product Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveClass("cart-item__name");
      expect(name).toHaveAttribute("title", "Test Product Name");
    });

    it("renders the formatted price", () => {
      render(<CartItem {...defaultProps} />);

      const prices = screen.getAllByText("$29.99");
      const price = prices.find((p) =>
        p.classList.contains("cart-item__price")
      );
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass("cart-item__price");
    });

    it("renders the subtotal label", () => {
      render(<CartItem {...defaultProps} />);

      const subtotalLabel = screen.getByText("Subtotal");
      expect(subtotalLabel).toBeInTheDocument();
      expect(subtotalLabel).toHaveClass("cart-item__subtotal-label");
    });

    it("formats price correctly with two decimal places", () => {
      render(<CartItem {...defaultProps} price={19.9} />);

      const prices = screen.getAllByText("$19.90");
      const price = prices.find((p) =>
        p.classList.contains("cart-item__price")
      );
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass("cart-item__price");
    });

    it("formats price correctly for whole numbers", () => {
      render(<CartItem {...defaultProps} price={20} />);

      const prices = screen.getAllByText("$20.00");
      const price = prices.find((p) =>
        p.classList.contains("cart-item__price")
      );
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass("cart-item__price");
    });
  });

  describe("interactions", () => {
    it("calls removeFromCart with correct id when remove button is clicked", async () => {
      // First add the item to the cart
      useCartStore.getState().addToCart(defaultProps.id);

      render(<CartItem {...defaultProps} />);

      const removeButton = screen.getByRole("button", { name: "Remove item" });
      await userEvent.click(removeButton);

      // Verify item was removed from store
      expect(useCartStore.getState().isInCart(defaultProps.id)).toBe(false);
    });

    it("removes item from cart when remove button is clicked multiple times", async () => {
      // Add multiple items to cart
      useCartStore.getState().addToCart(defaultProps.id);
      useCartStore.getState().addToCart(2);
      useCartStore.getState().addToCart(3);

      render(<CartItem {...defaultProps} />);

      const removeButton = screen.getByRole("button", { name: "Remove item" });

      // Click remove button
      await userEvent.click(removeButton);

      // Verify the specific item was removed
      expect(useCartStore.getState().isInCart(defaultProps.id)).toBe(false);
      // Verify other items are still in cart
      expect(useCartStore.getState().isInCart(2)).toBe(true);
      expect(useCartStore.getState().isInCart(3)).toBe(true);
    });
  });
});
