import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";
import useCartStore from "@store/cartStore";

// Mock the cart store
jest.mock("@store/cartStore");

// Mock the SVG icon
jest.mock("@assets/icons/cart.svg", () => {
  return function CartIcon({ className }: { className?: string }) {
    return <svg data-testid="cart-icon" className={className} />;
  };
});

const mockUseCartStore = useCartStore as jest.MockedFunction<
  typeof useCartStore
>;

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the cart icon", () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(1),
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveClass("cart__icon");
  });

  it("renders a link to /cart", () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(0),
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cart");
    expect(link).toHaveClass("cart");
  });

  it("does not display quantity badge when cart is empty", () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(0),
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const quantityBadge = screen.queryByText("0");
    expect(quantityBadge).not.toBeInTheDocument();
  });

  it("displays quantity badge when cart has items", () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(5),
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const quantityBadge = screen.getByText("5");
    expect(quantityBadge).toBeInTheDocument();
    expect(quantityBadge).toHaveClass("cart__quantity");
  });

  it("displays correct quantity when cart has multiple items", () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(12),
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const quantityBadge = screen.getByText("12");
    expect(quantityBadge).toBeInTheDocument();
  });

  it("calls getTotalQuantity from the store", () => {
    const mockGetTotalQuantity = jest.fn().mockReturnValue(3);
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: mockGetTotalQuantity,
    } as any);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(mockGetTotalQuantity).toHaveBeenCalledTimes(1);
  });

  it("navigates to /cart when user clicks on the cart icon", async () => {
    mockUseCartStore.mockReturnValue({
      getTotalQuantity: jest.fn().mockReturnValue(0),
    } as any);

    let currentLocation = "/";
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Cart />,
        },
        {
          path: "/cart",
          element: <div>Cart Page</div>,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    // Track location changes
    router.subscribe((state) => {
      currentLocation = state.location.pathname;
    });

    render(<RouterProvider router={router} />);

    const link = screen.getByRole("link");
    await userEvent.click(link);

    expect(currentLocation).toBe("/cart");
  });
});
