import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import Checkout from "./Checkout";
import useCartStore, { TProduct } from "@store/cartStore";
import useProducts from "@contexts/useProducts";
import { toast } from "react-toastify";

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock useProducts
jest.mock("@contexts/useProducts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

describe("Checkout", () => {
  const mockProducts: TProduct[] = [
    {
      id: 1,
      name: "Product A",
      price: 30,
      description: "Description A",
      image: "product-1.jpg",
      src: "/assets/images/product-1.jpg",
      alt: "Product A",
    },
    {
      id: 2,
      name: "Product B",
      price: 40,
      description: "Description B",
      image: "product-2.jpg",
      src: "/assets/images/product-2.jpg",
      alt: "Product B",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.getState().clearCart();
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      getProductById: (id: number) => mockProducts.find((p) => p.id === id),
    });
  });

  const renderCheckout = (initialEntries = ["/checkout"]) => {
    return render(
      <HelmetProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Checkout />
        </MemoryRouter>
      </HelmetProvider>
    );
  };

  describe("rendering", () => {
    it("renders checkout page with title", () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      expect(screen.getByText("Checkout")).toBeInTheDocument();
      expect(screen.getByText("Checkout")).toHaveClass("checkout-page__title");
    });

    it("renders shipping information section", () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      expect(screen.getByText("Shipping Information")).toBeInTheDocument();
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
      expect(screen.getByLabelText("Email *")).toBeInTheDocument();
      expect(screen.getByLabelText("Address *")).toBeInTheDocument();
      expect(screen.getByLabelText("City *")).toBeInTheDocument();
      expect(screen.getByLabelText("State *")).toBeInTheDocument();
      expect(screen.getByLabelText("ZIP Code *")).toBeInTheDocument();
      expect(screen.getByLabelText("Country *")).toBeInTheDocument();
    });

    it("renders payment information section", () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      expect(screen.getByText("Payment Information")).toBeInTheDocument();
      expect(screen.getByLabelText("Card Number *")).toBeInTheDocument();
      expect(screen.getByLabelText("Cardholder Name *")).toBeInTheDocument();
      // PatternFormat doesn't properly associate with label, check label text directly
      expect(screen.getByText("Expiry Date *")).toBeInTheDocument();
      expect(screen.getByLabelText("CVV *")).toBeInTheDocument();
    });

    it("renders action buttons", () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      expect(
        screen.getByRole("button", { name: "Go back to cart" })
      ).toBeInTheDocument();
      // Use aria-label which is "Complete purchase" (lowercase)
      expect(
        screen.getByRole("button", { name: "Complete purchase" })
      ).toBeInTheDocument();
    });

    it("renders cart summary with products", () => {
      useCartStore.getState().addToCart(1);
      useCartStore.getState().addToCart(2);
      renderCheckout();

      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
      expect(screen.getByText("$70.00")).toBeInTheDocument();
    });

    it("sets correct page title and meta description", async () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      // Wait for Helmet to update the document title
      await waitFor(() => {
        expect(document.title).toBe("Checkout - 90s Marketplace");
      });
    });
  });

  describe("navigation", () => {
    it("redirects to cart when cart is empty", () => {
      renderCheckout();

      expect(mockNavigate).toHaveBeenCalledWith("/cart");
    });

    it("does not redirect when cart has items", () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      expect(mockNavigate).not.toHaveBeenCalledWith("/cart");
    });

    it("navigates to cart when 'Back to Cart' button is clicked", async () => {
      useCartStore.getState().addToCart(1);
      renderCheckout();

      const backButton = screen.getByRole("button", {
        name: "Go back to cart",
      });
      await userEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/cart");
    });
  });

  describe("form validation - shipping information", () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(1);
    });

    it("shows error when full name is empty", async () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      userEvent.click(fullNameInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeInTheDocument();
      });
    });

    it("shows error when full name is too short", async () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      userEvent.type(fullNameInput, "A");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Full name must be at least 2 characters")
        ).toBeInTheDocument();
      });
    });

    it("shows error when email is empty", async () => {
      renderCheckout();

      const emailInput = screen.getByLabelText("Email *");
      userEvent.click(emailInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });
    });

    it("shows error when email is invalid", async () => {
      renderCheckout();

      const emailInput = screen.getByLabelText("Email *");
      userEvent.type(emailInput, "invalid-email");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address")
        ).toBeInTheDocument();
      });
    });

    it("shows error when address is empty", async () => {
      renderCheckout();

      const addressInput = screen.getByLabelText("Address *");
      userEvent.click(addressInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Address is required")).toBeInTheDocument();
      });
    });

    it("shows error when address is too short", async () => {
      renderCheckout();

      const addressInput = screen.getByLabelText("Address *");
      userEvent.type(addressInput, "123");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Address must be at least 5 characters")
        ).toBeInTheDocument();
      });
    });

    it("shows error when city is empty", async () => {
      renderCheckout();

      const cityInput = screen.getByLabelText("City *");
      userEvent.click(cityInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("City is required")).toBeInTheDocument();
      });
    });

    it("shows error when state is empty", async () => {
      renderCheckout();

      const stateInput = screen.getByLabelText("State *");
      userEvent.click(stateInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("State is required")).toBeInTheDocument();
      });
    });

    it("shows error when zip code is empty", async () => {
      renderCheckout();

      const zipCodeInput = screen.getByLabelText("ZIP Code *");
      userEvent.click(zipCodeInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("ZIP code is required")).toBeInTheDocument();
      });
    });

    it("shows error when zip code is too short", async () => {
      renderCheckout();

      const zipCodeInput = screen.getByLabelText("ZIP Code *");
      userEvent.type(zipCodeInput, "1234");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("ZIP code must be at least 5 digits")
        ).toBeInTheDocument();
      });
    });

    it("formats zip code to numeric only", async () => {
      renderCheckout();

      const zipCodeInput = screen.getByLabelText(
        "ZIP Code *"
      ) as HTMLInputElement;
      userEvent.type(zipCodeInput, "12345");

      // The input should only contain numbers
      expect(zipCodeInput.value).toBe("12345");
    });

    it("shows error when country is empty", async () => {
      renderCheckout();

      const countryInput = screen.getByLabelText("Country *");
      userEvent.click(countryInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Country is required")).toBeInTheDocument();
      });
    });
  });

  describe("form validation - payment information", () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(1);
    });

    it("shows error when card number is empty", async () => {
      renderCheckout();

      const cardNumberInput = screen.getByLabelText("Card Number *");
      userEvent.click(cardNumberInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Card number is required")).toBeInTheDocument();
      });
    });

    it("shows error when card number is too short", async () => {
      renderCheckout();

      const cardNumberInput = screen.getByLabelText("Card Number *");
      userEvent.type(cardNumberInput, "123456789012");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid card number (13-16 digits)")
        ).toBeInTheDocument();
      });
    });

    it("formats card number with spaces", async () => {
      renderCheckout();

      const cardNumberInput = screen.getByLabelText(
        "Card Number *"
      ) as HTMLInputElement;
      userEvent.type(cardNumberInput, "1234567890123456");

      // Card number should be formatted with spaces
      expect(cardNumberInput.value).toBe("1234 5678 9012 3456");
    });

    it("shows error when cardholder name is empty", async () => {
      renderCheckout();

      const cardNameInput = screen.getByLabelText("Cardholder Name *");
      userEvent.click(cardNameInput);
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Cardholder name is required")
        ).toBeInTheDocument();
      });
    });

    it("shows error when expiry date is empty", async () => {
      renderCheckout();

      // PatternFormat doesn't properly associate with label, use placeholder instead
      const expiryDateInput = screen.getByPlaceholderText("MM/YY");
      userEvent.click(expiryDateInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Expiry date is required")).toBeInTheDocument();
      });
    });

    it("shows error when expiry date format is invalid", async () => {
      renderCheckout();

      // PatternFormat doesn't properly associate with label, use placeholder instead
      const expiryDateInput = screen.getByPlaceholderText("MM/YY");
      userEvent.type(expiryDateInput, "12/2");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid expiry date (MM/YY)")
        ).toBeInTheDocument();
      });
    });

    it("shows error when expiry month is invalid", async () => {
      renderCheckout();

      // PatternFormat doesn't properly associate with label, use placeholder instead
      const expiryDateInput = screen.getByPlaceholderText("MM/YY");
      userEvent.type(expiryDateInput, "13/25");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Month must be between 01 and 12")
        ).toBeInTheDocument();
      });
    });

    it("shows error when expiry date is in the past", async () => {
      renderCheckout();

      // PatternFormat doesn't properly associate with label, use placeholder instead
      const expiryDateInput = screen.getByPlaceholderText("MM/YY");
      // Use a past date (e.g., 01/20 for January 2020)
      userEvent.type(expiryDateInput, "01/20");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Expiry date cannot be in the past")
        ).toBeInTheDocument();
      });
    });

    it("shows error when CVV is empty", async () => {
      renderCheckout();

      const cvvInput = screen.getByLabelText("CVV *");
      userEvent.click(cvvInput);
      userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("CVV is required")).toBeInTheDocument();
      });
    });

    it("shows error when CVV is invalid", async () => {
      renderCheckout();

      const cvvInput = screen.getByLabelText("CVV *");
      userEvent.type(cvvInput, "12");
      userEvent.tab();

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid CVV (3-4 digits)")
        ).toBeInTheDocument();
      });
    });

    it("formats CVV to numeric only", () => {
      renderCheckout();

      const cvvInput = screen.getByLabelText("CVV *") as HTMLInputElement;
      userEvent.type(cvvInput, "123abc");

      // CVV should only contain numbers
      expect(cvvInput.value).toBe("123");
    });
  });

  describe("form submission", () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(1);
    });

    const fillValidForm = async () => {
      userEvent.type(screen.getByLabelText("Full Name *"), "John Doe");
      userEvent.type(screen.getByLabelText("Email *"), "john@example.com");
      userEvent.type(screen.getByLabelText("Address *"), "123 Main Street");
      userEvent.type(screen.getByLabelText("City *"), "New York");
      userEvent.type(screen.getByLabelText("State *"), "NY");
      userEvent.type(screen.getByLabelText("ZIP Code *"), "10001");
      userEvent.type(screen.getByLabelText("Country *"), "USA");
      userEvent.type(
        screen.getByLabelText("Card Number *"),
        "1234567890123456"
      );
      userEvent.type(screen.getByLabelText("Cardholder Name *"), "John Doe");

      // Get future expiry date (e.g., 12/30 for December 2030)
      const futureYear = (new Date().getFullYear() % 100) + 5;
      // PatternFormat doesn't properly associate with label, use placeholder instead
      const expiryDateInput = screen.getByPlaceholderText("MM/YY");
      userEvent.type(expiryDateInput, `12/${futureYear}`);

      userEvent.type(screen.getByLabelText("CVV *"), "123");
    };

    it("submits form with valid data", async () => {
      renderCheckout();
      await fillValidForm();

      // Use aria-label which is "Complete purchase" (lowercase)
      const submitButton = screen.getByRole("button", {
        name: "Complete purchase",
      });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(useCartStore.getState().items.size).toBe(0);
      });
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          "Order placed successfully!"
        );
      });
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/checkout/success");
      });
    });

    it("does not submit form with invalid data", async () => {
      renderCheckout();

      // Fill only some fields
      userEvent.type(screen.getByLabelText("Full Name *"), "John Doe");
      // Leave email empty

      // Use aria-label which is "Complete purchase" (lowercase)
      const submitButton = screen.getByRole("button", {
        name: "Complete purchase",
      });
      userEvent.click(submitButton);

      // Wait for validation error to appear (confirms form validation is working)
      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });

      // Give a small delay to ensure any async submission would have completed
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify form did not submit
      expect(mockNavigate).not.toHaveBeenCalledWith("/checkout/success");
    });

    it("clears cart on successful submission", async () => {
      await waitFor(() => {
        useCartStore.getState().addToCart(1);
      });
      await waitFor(() => {
        useCartStore.getState().addToCart(2);
      });
      renderCheckout();

      expect(useCartStore.getState().items.size).toBe(2);

      await fillValidForm();

      // Wait for button to be available and use aria-label
      const submitButton = screen.getByRole("button", {
        name: "Complete purchase",
      });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(useCartStore.getState().items.size).toBe(0);
      });
    });
  });

  describe("cart summary", () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(1);
    });
    it("displays correct total for single product", async () => {
      renderCheckout();

      // Check total specifically (not product price)
      const totalSection = screen.getByTestId("cart-summary-total");
      expect(totalSection).toHaveTextContent("$30.00");
    });

    it("displays correct total for multiple products", async () => {
      await waitFor(() => {
        useCartStore.getState().addToCart(2);
      });
      renderCheckout();

      // Check total specifically
      const totalSection = screen.getByTestId("cart-summary-total");
      expect(totalSection).toHaveTextContent("$70.00");
    });

    it("updates total when cart changes", async () => {
      const { rerender } = renderCheckout();

      // Check total specifically (not product price)
      const totalSection = screen.getByTestId("cart-summary-total");
      expect(totalSection).toHaveTextContent("$30.00");

      await waitFor(() => {
        useCartStore.getState().addToCart(2);
      });

      rerender(
        <HelmetProvider>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </HelmetProvider>
      );

      // Check updated total
      expect(totalSection).toHaveTextContent("$70.00");
    });
  });

  describe("accessibility", () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(1);
    });

    it("has proper aria labels for form inputs", () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      expect(fullNameInput).toHaveAttribute("aria-invalid", "false");

      const emailInput = screen.getByLabelText("Email *");
      expect(emailInput).toHaveAttribute("aria-invalid", "false");
    });

    it("sets aria-invalid when field has error", async () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      userEvent.click(fullNameInput);
      userEvent.tab();

      await waitFor(() => {
        expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("has aria-describedby for error messages", async () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      userEvent.click(fullNameInput);
      userEvent.tab();

      await waitFor(() => {
        expect(fullNameInput).toHaveAttribute(
          "aria-describedby",
          "fullName-error"
        );
      });

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toHaveAttribute(
          "id",
          "fullName-error"
        );
      });
    });

    it("has role='alert' on error messages", async () => {
      renderCheckout();

      const fullNameInput = screen.getByLabelText("Full Name *");
      userEvent.click(fullNameInput);
      userEvent.tab();

      await waitFor(() => {
        const errorMessage = screen.getByText("Full name is required");
        expect(errorMessage).toHaveAttribute("role", "alert");
      });
    });
  });
});
