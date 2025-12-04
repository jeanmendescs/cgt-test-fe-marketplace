import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Product from "./Product";
import useCartStore from "@store/cartStore";

describe("Product", () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.getState().clearCart();
  });

  const defaultProps = {
    src: "/assets/images/product-1.jpg",
    id: 1,
    name: "Test Product Name",
    description:
      "This is a test product description that is longer than 100 characters to test the truncation functionality in the component",
    price: 29.99,
    image: "product-1.jpg",
    alt: "Test product image",
    quantityInCart: 0,
  };

  describe("rendering", () => {
    it("renders the product name", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const name = screen.getByText("Test Product Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveClass("product__name");
    });

    it("renders the truncated product description", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const description = screen.getByTitle(defaultProps.description);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("product__description");
      expect(description.textContent).toMatch(/\.\.\.$/);
    });

    it("truncates description to 100 characters", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const description = screen.getByTitle(defaultProps.description);
      expect(description.textContent?.length).toBeLessThanOrEqual(103); // 100 chars + "..."
    });

    it("renders the formatted price", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const price = screen.getByText("$29.99");
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass("product__price");
    });

    it("renders the product image with correct src and alt", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const image = screen.getByAltText("Test product image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveClass("product__image");
    });

    it("renders a link to the product detail page", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} />
        </MemoryRouter>
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/product/1");
      expect(link).toHaveClass("product-link");
    });
  });

  describe("when product is not in cart", () => {
    it("renders ADD TO CART button", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={0} />
        </MemoryRouter>
      );

      const addButton = screen.getByRole("button", { name: "Add to Cart" });
      expect(addButton).toBeInTheDocument();
    });

    it("does not render REMOVE button", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={0} />
        </MemoryRouter>
      );

      const removeButton = screen.queryByRole("button", { name: "Remove" });
      expect(removeButton).not.toBeInTheDocument();
    });

    it("does not render quantity badge", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={0} />
        </MemoryRouter>
      );

      const badge = screen.queryByText("1");
      expect(badge).not.toBeInTheDocument();
    });

    it("adds product to cart when ADD TO CART button is clicked", async () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={0} />
        </MemoryRouter>
      );

      const addButton = screen.getByRole("button", { name: "Add to Cart" });
      await userEvent.click(addButton);

      // Verify item was added to store
      expect(useCartStore.getState().isInCart(defaultProps.id)).toBe(true);
    });
  });

  describe("when product is in cart", () => {
    it("renders REMOVE button", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={1} />
        </MemoryRouter>
      );

      const removeButton = screen.getByRole("button", { name: "Remove" });
      expect(removeButton).toBeInTheDocument();
    });

    it("does not render ADD TO CART button", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={1} />
        </MemoryRouter>
      );

      const addButton = screen.queryByRole("button", { name: "Add to Cart" });
      expect(addButton).not.toBeInTheDocument();
    });

    it("renders quantity badge when product is in cart", () => {
      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={1} />
        </MemoryRouter>
      );

      const badge = screen.getByText("1");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("product__badge");
    });

    it("removes product from cart when REMOVE button is clicked", async () => {
      // First add the item to the cart
      useCartStore.getState().addToCart(defaultProps.id);

      render(
        <MemoryRouter>
          <Product {...defaultProps} quantityInCart={1} />
        </MemoryRouter>
      );

      const removeButton = screen.getByRole("button", { name: "Remove" });
      await userEvent.click(removeButton);

      // Verify item was removed from store
      expect(useCartStore.getState().isInCart(defaultProps.id)).toBe(false);
    });
  });
});

