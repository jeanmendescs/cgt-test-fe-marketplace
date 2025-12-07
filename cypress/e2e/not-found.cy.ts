/// <reference types="cypress" />

describe("NotFound Page", () => {
  describe("Page Access", () => {
    it("should display 404 page for various invalid routes", () => {
      // Routes that directly match catch-all (keep original URL)
      const directNotFoundRoutes = [
        "/invalid",
        "/random/path",
        "/cart/invalid",
      ];

      directNotFoundRoutes.forEach((route) => {
        cy.visit(route, { failOnStatusCode: false });
        cy.get(".not-found-page").should("exist");
        cy.url().should("include", route);
      });

      // Product routes redirect to /404 (URL changes)
      const productRoutes = ["/product/999", "/product/abc"];

      productRoutes.forEach((route) => {
        cy.visit(route, { failOnStatusCode: false });
        cy.get(".not-found-page").should("exist");
        cy.url().should("include", "/404");
      });
    });
  });

  describe("Page Structure", () => {
    beforeEach(() => {
      cy.visit("/non-existent-page", { failOnStatusCode: false });
    });

    it("should display the correct page structure", () => {
      // Check main container
      cy.get(".not-found-page").should("exist");
      cy.get(".not-found-page__container").should("exist");
      cy.get(".not-found-page__content").should("exist");
    });

    it("should display the 404 title", () => {
      cy.get(".not-found-page__title").should("exist").should("contain", "404");
    });

    it("should display the Page Not Found subtitle", () => {
      cy.get(".not-found-page__subtitle")
        .should("exist")
        .should("contain", "Page Not Found");
    });

    it("should display the error message", () => {
      cy.get(".not-found-page__message")
        .should("exist")
        .should("contain", "Oops! The page you're looking for doesn't exist.");
    });

    it("should display the Go Back Home button", () => {
      cy.get("button").should("contain", "Go Back Home");
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      cy.visit("/non-existent-page", { failOnStatusCode: false });
    });

    it("should navigate to home page when Go Back Home button is clicked", () => {
      cy.get("button").contains("Go Back Home").click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get(".home").should("exist");
    });

    it("should navigate correctly from different invalid routes", () => {
      // Test from one invalid route
      cy.visit("/random-path", { failOnStatusCode: false });
      cy.get("button").contains("Go Back Home").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      // Test from another invalid route
      cy.visit("/another/invalid/route", { failOnStatusCode: false });
      cy.get("button").contains("Go Back Home").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Visual Elements", () => {
    beforeEach(() => {
      cy.visit("/non-existent-page", { failOnStatusCode: false });
    });

    it("should have all visual elements visible", () => {
      cy.get(".not-found-page__title").should("be.visible");
      cy.get(".not-found-page__subtitle").should("be.visible");
      cy.get(".not-found-page__message").should("be.visible");
      cy.get("button").contains("Go Back Home").should("be.visible");
    });

    it("should have correct text hierarchy", () => {
      // Title should be an h1
      cy.get("h1.not-found-page__title").should("exist");

      // Subtitle should be an h2
      cy.get("h2.not-found-page__subtitle").should("exist");

      // Message should be a paragraph
      cy.get("p.not-found-page__message").should("exist");
    });
  });

  describe("User Flow", () => {
    it("should allow user to navigate from 404 page back to home", () => {
      // Start at home
      cy.visit("/");
      cy.get(".home").should("exist");

      // Navigate to invalid route
      cy.visit("/invalid-route", { failOnStatusCode: false });
      cy.get(".not-found-page").should("exist");

      // Click Go Back Home
      cy.get("button").contains("Go Back Home").click();

      // Should be back at home
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get(".home").should("exist");
    });

    it("should handle navigation after visiting product detail page with invalid ID", () => {
      // Visit a product detail page with invalid ID
      cy.visit("/product/999", { failOnStatusCode: false });
      cy.get(".not-found-page").should("exist");

      // Navigate back to home
      cy.get("button").contains("Go Back Home").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get(".home").should("exist");
    });
  });
});
