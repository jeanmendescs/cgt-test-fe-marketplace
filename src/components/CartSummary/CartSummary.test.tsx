import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CartSummary } from "./CartSummary";
import { TProduct } from "@store/cartStore";

describe("CartSummary", () => {
  const mockProducts: TProduct[] = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      description: "Description 1",
      image: "/image1.jpg",
      src: "/image1.jpg",
      alt: "Product 1 image",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.5,
      description: "Description 2",
      image: "/image2.jpg",
      src: "/image2.jpg",
      alt: "Product 2 image",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.9,
      description: "Description 3",
      image: "/image3.jpg",
      src: "/image3.jpg",
      alt: "Product 3 image",
    },
  ];

  const defaultProps = {
    products: mockProducts,
    total: 99.39,
    onClearCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderCartSummary = (props = defaultProps) => {
    return render(
      <MemoryRouter>
        <CartSummary.Root>
          <CartSummary.Body products={props.products} total={props.total} />
          <CartSummary.Actions onClearCart={props.onClearCart} />
        </CartSummary.Root>
      </MemoryRouter>
    );
  };

  describe("rendering", () => {
    it("renders the order summary title", () => {
      renderCartSummary();

      const title = screen.getByText("Order Summary");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("cart-summary__title");
    });

    it("renders all product rows with names and prices", () => {
      renderCartSummary();

      mockProducts.forEach((product) => {
        const name = screen.getByText(product.name);
        expect(name).toBeInTheDocument();
        expect(name).toHaveClass("cart-summary__name");

        const price = screen.getByText(`$${product.price.toFixed(2)}`);
        expect(price).toBeInTheDocument();
      });
    });

    it("renders the total section with formatted total", () => {
      renderCartSummary();

      const totalLabel = screen.getByText("Total");
      expect(totalLabel).toBeInTheDocument();

      const totalValue = screen.getByText(`$${defaultProps.total.toFixed(2)}`);
      expect(totalValue).toBeInTheDocument();
    });

    it("renders the continue shopping link", () => {
      renderCartSummary();

      const link = screen.getByText("← Continue Shopping");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("cart-summary__continue");
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders the clear cart button", () => {
      renderCartSummary();

      const clearButton = screen.getByRole("button", {
        name: "Clear all items from cart",
      });
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).toHaveClass("cart-summary__clear");
      expect(clearButton).toHaveTextContent("Clear Cart");
    });

    it("renders the proceed to checkout button", () => {
      renderCartSummary();

      const checkoutButton = screen.getByRole("button", {
        name: "Proceed to checkout",
      });
      expect(checkoutButton).toBeInTheDocument();
      expect(checkoutButton).toHaveClass("cart-summary__checkout");
      expect(checkoutButton).toHaveTextContent("Proceed to Checkout");
    });
  });

  describe("price formatting", () => {
    it("formats prices with two decimal places", () => {
      const products: TProduct[] = [
        {
          id: 1,
          name: "Product 1",
          price: 19.9,
          description: "Description",
          image: "/image.jpg",
          src: "/image.jpg",
          alt: "Product image",
        },
      ];
      renderCartSummary({ products, total: 19.9, onClearCart: jest.fn() });

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$19.90");
    });

    it("formats whole number prices correctly", () => {
      const products: TProduct[] = [
        {
          id: 1,
          name: "Product 1",
          price: 20,
          description: "Description",
          image: "/image.jpg",
          src: "/image.jpg",
          alt: "Product image",
        },
      ];
      renderCartSummary({ products, total: 20, onClearCart: jest.fn() });

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$20.00");
    });

    it("formats total with two decimal places", () => {
      const products: TProduct[] = [
        {
          id: 1,
          name: "Product 1",
          price: 15.5,
          description: "Description",
          image: "/image.jpg",
          src: "/image.jpg",
          alt: "Product image",
        },
      ];
      renderCartSummary({ products, total: 15.5, onClearCart: jest.fn() });

      const priceElements = screen.getAllByTestId("cart-summary-price");
      // The last price element should be the total
      const totalElement = priceElements[priceElements.length - 1];
      expect(totalElement).toHaveTextContent("$15.50");
    });
  });

  describe("interactions", () => {
    it("calls onClearCart when clear cart button is clicked", async () => {
      const mockOnClearCart = jest.fn();
      renderCartSummary({
        products: mockProducts,
        total: 99.39,
        onClearCart: mockOnClearCart,
      });

      const clearButton = screen.getByRole("button", {
        name: "Clear all items from cart",
      });
      await userEvent.click(clearButton);

      expect(mockOnClearCart).toHaveBeenCalledTimes(1);
    });
  });

  describe("product list", () => {
    it("renders products in the correct order", () => {
      renderCartSummary();

      const productNames = screen.getAllByTestId("cart-summary-name");
      expect(productNames).toHaveLength(3);
      expect(productNames[0]).toHaveTextContent("Product 1");
      expect(productNames[1]).toHaveTextContent("Product 2");
      expect(productNames[2]).toHaveTextContent("Product 3");
    });

    it("renders single product correctly", () => {
      const singleProduct: TProduct[] = [
        {
          id: 1,
          name: "Single Product",
          price: 25.99,
          description: "Description",
          image: "/image.jpg",
          src: "/image.jpg",
          alt: "Product image",
        },
      ];
      renderCartSummary({
        products: singleProduct,
        total: 25.99,
        onClearCart: jest.fn(),
      });

      const name = screen.getByText("Single Product");
      expect(name).toBeInTheDocument();

      const priceElements = screen.getAllByTestId("cart-summary-price");
      expect(priceElements[0]).toHaveTextContent("$25.99");
    });
  });
});
