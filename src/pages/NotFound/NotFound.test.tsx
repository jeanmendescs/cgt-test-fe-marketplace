import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NotFoundPage from "./NotFound";

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NotFoundPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the 404 title", () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const title = screen.getByText("404");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("not-found-page__title");
    });

    it("renders the page not found subtitle", () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const subtitle = screen.getByText("Page Not Found");
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass("not-found-page__subtitle");
    });

    it("renders the error message", () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const message = screen.getByText(
        "Oops! The page you're looking for doesn't exist."
      );
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass("not-found-page__message");
    });

    it("renders the Go Back Home button", () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const button = screen.getByRole("button", {
        name: "Return to home page",
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Go Back Home");
    });

    it("renders with correct main container classes", () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const main = screen.getByRole("main");
      expect(main).toHaveClass("not-found-page");
    });

    it("renders with correct container structure", () => {
      const { container } = render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const containerElement = container.querySelector(
        ".not-found-page__container"
      );
      expect(containerElement).toBeInTheDocument();

      const contentElement = container.querySelector(
        ".not-found-page__content"
      );
      expect(contentElement).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("navigates to home page when Go Back Home button is clicked", async () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      const button = screen.getByRole("button", {
        name: "Return to home page",
      });
      await userEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
