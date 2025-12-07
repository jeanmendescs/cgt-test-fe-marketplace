/// <reference types="cypress" />

describe("ProductDetail Page", () => {
  beforeEach(() => {
    // Visit the home page first to ensure the app is loaded
    cy.visit("/");
  });

  describe("Valid Product", () => {
    it("should display product details when navigating to a valid product", () => {
      // Navigate to product detail page
      cy.visit("/product/1");

      // Check that product information is displayed
      cy.get(".product-detail").should("exist");
      cy.get(".product-info__name").should("contain", "Product A");
      cy.get(".product-info__description").should("exist");
      cy.get(".product-actions__price").should("contain", "$30.00");
      cy.get(".product-image__img").should("exist");
      cy.get(".product-image__img").should("have.attr", "alt", "Product A");
    });

    it("should display back button and navigate to home when clicked", () => {
      cy.visit("/product/1");

      // Check back button exists
      cy.get(".outlined-button--back").should("exist");
      cy.get(".outlined-button--back").should("contain", "Back");

      // Click back button
      cy.get(".outlined-button--back").click();

      // Should navigate to home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("should show 'ADD TO CART' button when product is not in cart", () => {
      // Clear cart first
      cy.window().then((win) => {
        // Access the cart store through the app's context
        // Since we can't directly access Zustand store, we'll test through UI
        cy.visit("/product/1");

        // Check that ADD TO CART button is visible
        cy.get(".product-actions").within(() => {
          cy.get("button").should("contain", "ADD TO CART");
        });

        // Verify no cart badge is shown
        cy.get(".product-image__badge").should("not.exist");
      });
    });

    it("should add product to cart when 'ADD TO CART' button is clicked", () => {
      cy.visit("/product/1");

      // Click ADD TO CART button
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Verify toast notification appears
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").should("contain", "Added to cart");

      // Verify button changes to REMOVE FROM CART
      cy.get(".product-actions").within(() => {
        cy.get("button").should("contain", "REMOVE FROM CART");
      });

      // Verify cart badge appears with quantity 1
      cy.get(".product-image__badge").should("exist");
      cy.get(".product-image__badge").should("contain", "1");
    });

    it("should remove product from cart when 'REMOVE FROM CART' button is clicked", () => {
      cy.visit("/product/1");

      // First add to cart
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Verify it's in cart
      cy.get(".product-image__badge").should("exist");

      // Wait for first toast to disappear or dismiss it
      cy.wait(100);

      // Click REMOVE FROM CART
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("REMOVE FROM CART").click();
      });

      // Verify toast notification appears
      cy.get(".Toastify__toast--info").should("exist");
      cy.get(".Toastify__toast--info").should("contain", "Removed from cart");

      // Verify button changes back to ADD TO CART
      cy.get(".product-actions").within(() => {
        cy.get("button").should("contain", "ADD TO CART");
      });

      // Verify cart badge is removed
      cy.get(".product-image__badge").should("not.exist");
    });

    it("should display correct product information for different products", () => {
      // Test Product B
      cy.visit("/product/2");
      cy.get(".product-info__name").should("contain", "Product B");
      cy.get(".product-actions__price").should("contain", "$40.00");
      cy.get(".product-image__img").should("have.attr", "alt", "Product B");

      // Test Product C
      cy.visit("/product/3");
      cy.get(".product-info__name").should("contain", "Product C");
      cy.get(".product-actions__price").should("contain", "$40.00");
      cy.get(".product-image__img").should("have.attr", "alt", "Product C");
    });

    it("should maintain cart state when navigating between products", () => {
      // Start from home page
      cy.visit("/");

      // Navigate to product 1 using client-side routing
      cy.visit("/product/1");

      // Add product 1 to cart
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Verify product 1 is in cart
      cy.get(".product-image__badge").should("exist");
      cy.get(".product-image__badge").should("contain", "1");

      // Navigate back to home using back button
      cy.get(".outlined-button--back").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      // Navigate to product 2 using client-side routing
      cy.visit("/product/2");

      // Verify product 2 is not in cart
      cy.get(".product-actions").within(() => {
        cy.get("button").should("contain", "ADD TO CART");
      });

      // Add product 2 to cart
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Navigate back to home using back button
      cy.get(".outlined-button--back").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      // Navigate back to product 1 using client-side routing - should still be in cart
      cy.visit("/product/1");

      // Verify product 1 is still in cart
      cy.get(".product-actions").within(() => {
        cy.get("button").should("contain", "REMOVE FROM CART");
      });
      cy.get(".product-image__badge").should("exist");
      cy.get(".product-image__badge").should("contain", "1");
    });
  });

  describe("Invalid Product", () => {
    it("should redirect to 404 page for invalid product ID", () => {
      cy.visit("/product/999", { failOnStatusCode: false });

      // Should redirect to 404 page
      cy.url().should("include", "/404");
      cy.get(".not-found-page").should("exist");
      cy.get(".not-found-page__title").should("contain", "404");
      cy.get(".not-found-page__subtitle").should("contain", "Page Not Found");
    });

    it("should handle non-numeric product ID gracefully", () => {
      cy.visit("/product/abc", { failOnStatusCode: false });

      // Should redirect to 404 page
      cy.url().should("include", "/404");
      cy.get(".not-found-page").should("exist");
      cy.get(".not-found-page__title").should("contain", "404");
      cy.get(".not-found-page__subtitle").should("contain", "Page Not Found");
      cy.get(".not-found-page__message").should(
        "contain",
        "Oops! The page you're looking for doesn't exist."
      );
    });
  });

  describe("Navigation", () => {
    it("should navigate to product detail from home page", () => {
      cy.visit("/");

      // Find and click on a product link
      cy.get(".product-link").first().click();

      // Should be on product detail page
      cy.url().should("include", "/product/");
      cy.get(".product-detail").should("exist");
    });
  });
});
