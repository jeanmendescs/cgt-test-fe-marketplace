import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

// Mock the Cart component
jest.mock("./Cart/Cart", () => {
  return function MockCart() {
    return <div data-testid="cart-component">Cart</div>;
  };
});

describe("Header", () => {
  it("renders the logo with correct text", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByText("90s Shop");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("header__logo");
  });

  it("renders the logo as a link to home", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole("link", { name: "90s Shop home" });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
    expect(logoLink).toHaveTextContent("90s Shop");
  });

  it("navigates to home when logo is clicked", () => {
    let currentLocation = "/cart";
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <div>Home Page</div>,
        },
        {
          path: "/cart",
          element: <Header />,
        },
      ],
      {
        initialEntries: ["/cart"],
      }
    );

    router.subscribe((state) => {
      currentLocation = state.location.pathname;
    });

    render(<RouterProvider router={router} />);

    const logoLink = screen.getByRole("link", { name: "90s Shop home" });
    userEvent.click(logoLink);

    expect(currentLocation).toBe("/");
  });

  it("navigates to home when Home link is clicked", () => {
    let currentLocation = "/cart";
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <div>Home Page</div>,
        },
        {
          path: "/cart",
          element: <Header />,
        },
      ],
      {
        initialEntries: ["/cart"],
      }
    );

    router.subscribe((state) => {
      currentLocation = state.location.pathname;
    });

    render(<RouterProvider router={router} />);

    const homeLink = screen.getByRole("link", { name: "Go to home page" });
    userEvent.click(homeLink);

    expect(currentLocation).toBe("/");
  });

  it("renders the Cart component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const cart = screen.getByTestId("cart-component");
    expect(cart).toBeInTheDocument();
  });
});
