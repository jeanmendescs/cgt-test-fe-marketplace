import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CartSummary from "./CartSummary";

describe("CartSummary", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 49.5 },
    { id: 3, name: "Product 3", price: 19.9 },
  ];

  const defaultProps = {
    products: mockProducts,
    total: 99.39,
    onClearCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the order summary title", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      const title = screen.getByText("Order Summary");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("cart-summary__title");
    });

    it("renders all product rows with names and prices", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      mockProducts.forEach((product) => {
        const name = screen.getByText(product.name);
        expect(name).toBeInTheDocument();
        expect(name).toHaveClass("cart-summary__name");

        const price = screen.getByText(`$${product.price.toFixed(2)}`);
        expect(price).toBeInTheDocument();
      });
    });

    it("renders the total section with formatted total", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      const totalLabel = screen.getByText("Total");
      expect(totalLabel).toBeInTheDocument();

      const totalValue = screen.getByText(`$${defaultProps.total.toFixed(2)}`);
      expect(totalValue).toBeInTheDocument();
    });

    it("renders the continue shopping link", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      const link = screen.getByText("← Continue Shopping");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("cart-summary__continue");
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders the clear cart button", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      const clearButton = screen.getByRole("button", { name: "Clear Cart" });
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).toHaveClass("cart-summary__clear");
    });
  });

  describe("price formatting", () => {
    it("formats prices with two decimal places", () => {
      const products = [{ id: 1, name: "Product 1", price: 19.9 }];
      render(
        <MemoryRouter>
          <CartSummary
            products={products}
            total={19.9}
            onClearCart={jest.fn()}
          />
        </MemoryRouter>
      );

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$19.90");
    });

    it("formats whole number prices correctly", () => {
      const products = [{ id: 1, name: "Product 1", price: 20 }];
      render(
        <MemoryRouter>
          <CartSummary products={products} total={20} onClearCart={jest.fn()} />
        </MemoryRouter>
      );

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$20.00");
    });

    it("formats total with two decimal places", () => {
      const products = [{ id: 1, name: "Product 1", price: 15.5 }];
      render(
        <MemoryRouter>
          <CartSummary
            products={products}
            total={15.5}
            onClearCart={jest.fn()}
          />
        </MemoryRouter>
      );

      const totalElement = screen.getByTestId("cart-summary-price");
      expect(totalElement).toHaveTextContent("$15.50");
    });
  });

  describe("interactions", () => {
    it("calls onClearCart when clear cart button is clicked", async () => {
      const mockOnClearCart = jest.fn();
      render(
        <MemoryRouter>
          <CartSummary
            products={mockProducts}
            total={99.39}
            onClearCart={mockOnClearCart}
          />
        </MemoryRouter>
      );

      // Click Clear Cart button to open confirmation dialog
      const clearButton = screen.getByRole("button", { name: "Clear Cart" });
      userEvent.click(clearButton);

      // Wait for dialog to appear and verify it's shown
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Verify dialog content - use getByRole for heading to avoid conflict with button
      expect(
        within(dialog).getByRole("heading", { name: "Clear Cart" })
      ).toBeInTheDocument();
      expect(
        within(dialog).getByText(
          "Are you sure you want to clear all items from your cart? This action cannot be undone."
        )
      ).toBeInTheDocument();

      // Find and click the confirm button in the dialog
      // Query all buttons with "Clear Cart" text
      const allClearCartButtons = screen.getAllByRole("button", {
        name: "Clear Cart",
      });
      // The confirm button in the dialog should be the one that's a child of the dialog
      // Check which button is inside the dialog element
      const confirmButton = allClearCartButtons.find((button) =>
        dialog.contains(button)
      );
      expect(confirmButton).toBeDefined();
      userEvent.click(confirmButton as HTMLButtonElement);

      // Verify onClearCart was called
      expect(mockOnClearCart).toHaveBeenCalledTimes(1);
    });
  });

  describe("product list", () => {
    it("renders products in the correct order", () => {
      render(
        <MemoryRouter>
          <CartSummary {...defaultProps} />
        </MemoryRouter>
      );

      const productNames = screen.getAllByTestId("cart-summary-name");
      expect(productNames).toHaveLength(3);
      expect(productNames[0]).toHaveTextContent("Product 1");
      expect(productNames[1]).toHaveTextContent("Product 2");
      expect(productNames[2]).toHaveTextContent("Product 3");
    });

    it("renders single product correctly", () => {
      const singleProduct = [{ id: 1, name: "Single Product", price: 25.99 }];
      render(
        <MemoryRouter>
          <CartSummary
            products={singleProduct}
            total={25.99}
            onClearCart={jest.fn()}
          />
        </MemoryRouter>
      );

      const name = screen.getByText("Single Product");
      expect(name).toBeInTheDocument();

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$25.99");
    });
  });
});
