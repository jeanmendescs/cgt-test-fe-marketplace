/// <reference types="cypress" />

describe("Cart Page", () => {
  beforeEach(() => {
    // Visit the home page first to ensure the app is loaded
    cy.visit("/");
  });

  describe("Empty Cart", () => {
    it("should display empty cart message when cart is empty", () => {
      // Navigate to cart page
      cy.visit("/cart");

      // Check that empty cart state is displayed
      cy.get(".cart-page__container").should("exist");
      cy.get(".cart-page__title").should("contain", "Your Cart");
      cy.get(".cart-page__subtitle").should("contain", "Nothing here yet...");
      cy.get(".cart-empty").should("exist");
      cy.get(".cart-empty__icon").should("exist");
      cy.get(".cart-empty__text").should("contain", "Your cart is empty");
      cy.get(".cart-empty__btn").should("contain", "Start Shopping");
    });

    it("should navigate to home when 'Start Shopping' button is clicked", () => {
      cy.visit("/cart");

      // Click Start Shopping button
      cy.get(".cart-empty__btn").click();

      // Should navigate to home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Cart with Items", () => {
    beforeEach(() => {
      // Add items to cart before each test
      cy.get(".product__button").eq(0).click();
      cy.get(".product__button").eq(1).click();

      // visit cart page
      cy.visit("/cart");
    });

    it("should display cart items when cart has products", () => {
      // Check that cart page is displayed
      cy.get(".cart-page__container").should("exist");
      cy.get(".cart-page__title").should("contain", "Your Cart");

      // Check that cart items are displayed
      cy.get(".cart-page__items").should("exist");
      cy.get(".cart-item").should("have.length", 2);

      // Check first cart item
      cy.get(".cart-item")
        .first()
        .within(() => {
          cy.get(".cart-item__name").should("contain", "Product A");
          cy.get(".cart-item__price").should("contain", "$30.00");
          cy.get(".cart-item__image").should("exist");
          cy.get(".cart-item__subtotal-label").should("contain", "Subtotal");
          cy.get(".cart-item__subtotal-value").should("contain", "$30.00");
          cy.get(".cart-item__remove").should("exist");
          cy.get(".cart-item__remove").should(
            "have.attr",
            "aria-label",
            "Remove item"
          );
        });

      // Check second cart item
      cy.get(".cart-item")
        .eq(1)
        .within(() => {
          cy.get(".cart-item__name").should("contain", "Product B");
          cy.get(".cart-item__price").should("contain", "$40.00");
          cy.get(".cart-item__subtotal-value").should("contain", "$40.00");
        });
    });

    it("should display cart summary with correct totals", () => {
      // Check that cart summary is displayed
      cy.get(".cart-summary").should("exist");
      cy.get(".cart-summary__title").should("contain", "Order Summary");

      // Check that product rows are displayed in summary
      cy.get(".cart-summary__rows").should("exist");
      cy.get(".cart-summary__row").should("have.length", 2);

      // Check first product in summary
      cy.get(".cart-summary__row")
        .first()
        .within(() => {
          cy.get('[data-testid="cart-summary-name"]').should(
            "contain",
            "Product A"
          );
          cy.get('[data-testid="cart-summary-price"]').should(
            "contain",
            "$30.00"
          );
        });

      // Check second product in summary
      cy.get(".cart-summary__row")
        .eq(1)
        .within(() => {
          cy.get('[data-testid="cart-summary-name"]').should(
            "contain",
            "Product B"
          );
          cy.get('[data-testid="cart-summary-price"]').should(
            "contain",
            "$40.00"
          );
        });

      // Check total
      cy.get(".cart-summary__total").should("exist");
      cy.get(".cart-summary__total").should("contain", "Total");
      cy.get(".cart-summary__total").should("contain", "$70.00");

      // Check actions
      cy.get(".cart-summary__actions").should("exist");
      cy.get(".cart-summary__continue").should(
        "contain",
        "← Continue Shopping"
      );
      cy.get(".cart-summary__clear").should("contain", "Clear Cart");
    });

    it("should remove item from cart when remove button is clicked", () => {
      // Verify we have 2 items
      cy.get(".cart-item").should("have.length", 2);

      // Remove first item
      cy.get(".cart-item")
        .first()
        .within(() => {
          cy.get(".cart-item__remove").click();
        });

      // Verify toast notification appears
      cy.get(".Toastify__toast--info").should("exist");
      cy.get(".Toastify__toast--info").should("contain", "Removed from cart");

      // Verify only 1 item remains
      cy.get(".cart-item").should("have.length", 1);
      cy.get(".cart-item")
        .first()
        .within(() => {
          cy.get(".cart-item__name").should("contain", "Product B");
        });

      // Verify summary is updated
      cy.get(".cart-summary__row").should("have.length", 1);
      cy.get(".cart-summary__total").should("contain", "$40.00");
    });

    it("should show confirmation dialog when 'Clear Cart' button is clicked", () => {
      // Verify we have items
      cy.get(".cart-item").should("have.length", 2);

      // Click Clear Cart button
      cy.get(".cart-summary__clear").click();

      // Verify confirmation dialog appears
      cy.get(".dialog-overlay").should("exist");
      cy.get(".dialog-content").should("exist");
      cy.get(".dialog-body").should("contain", "Clear Cart");
      cy.get(".dialog-body").should(
        "contain",
        "Are you sure you want to clear all items from your cart? This action cannot be undone."
      );
      cy.get(".dialog-actions__cancel").should("contain", "Cancel");
      cy.get(".dialog-actions__confirm").should("contain", "Clear Cart");
    });

    it("should not clear cart when cancel button is clicked in confirmation dialog", () => {
      // Verify we have items
      cy.get(".cart-item").should("have.length", 2);

      // Click Clear Cart button
      cy.get(".cart-summary__clear").click();

      // Verify confirmation dialog appears
      cy.get(".dialog-overlay").should("exist");

      // Click Cancel button
      cy.get(".dialog-actions__cancel").click();

      // Verify dialog is closed
      cy.get(".dialog-overlay").should("not.exist");

      // Verify cart items are still present
      cy.get(".cart-item").should("have.length", 2);
      cy.get(".cart-summary__total").should("contain", "$70.00");
    });

    it("should clear all items when confirmation dialog is confirmed", () => {
      // Verify we have items
      cy.get(".cart-item").should("have.length", 2);

      // Click Clear Cart button
      cy.get(".cart-summary__clear").click();

      // Verify confirmation dialog appears
      cy.get(".dialog-overlay").should("exist");

      // Click Confirm button
      cy.get(".dialog-actions__confirm").click();

      // Verify toast notification appears
      cy.get(".Toastify__toast--info").should("exist");
      cy.get(".Toastify__toast--info").should("contain", "Cart cleared");

      // Verify empty cart state is displayed
      cy.get(".cart-empty").should("exist");
      cy.get(".cart-empty__text").should("contain", "Your cart is empty");
      cy.get(".cart-item").should("not.exist");
    });

    it("should close confirmation dialog when clicking outside (on overlay)", () => {
      // Verify we have items
      cy.get(".cart-item").should("have.length", 2);

      // Click Clear Cart button
      cy.get(".cart-summary__clear").click();

      // Verify confirmation dialog appears
      cy.get(".dialog-overlay").should("exist");

      // Click on overlay (outside dialog)
      cy.get(".dialog-overlay").click({ force: true });

      // Verify dialog is closed
      cy.get(".dialog-overlay").should("not.exist");

      // Verify cart items are still present
      cy.get(".cart-item").should("have.length", 2);
    });

    it("should close confirmation dialog when pressing Escape key", () => {
      // Verify we have items
      cy.get(".cart-item").should("have.length", 2);

      // Click Clear Cart button
      cy.get(".cart-summary__clear").click();

      // Verify confirmation dialog appears
      cy.get(".dialog-overlay").should("exist");

      // Press Escape key
      cy.get("body").type("{esc}");

      // Verify dialog is closed
      cy.get(".dialog-overlay").should("not.exist");

      // Verify cart items are still present
      cy.get(".cart-item").should("have.length", 2);
    });

    it("should navigate to home when 'Continue Shopping' link is clicked", () => {
      // Click Continue Shopping link
      cy.get(".cart-summary__continue").click();

      // Should navigate to home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("should update cart summary when items are removed", () => {
      // Verify initial total
      cy.get(".cart-summary__total").should("contain", "$70.00");

      // Remove Product A ($30.00)
      cy.get(".cart-item")
        .first()
        .within(() => {
          cy.get(".cart-item__name").should("contain", "Product A");
          cy.get(".cart-item__remove").click();
        });

      // Verify updated total
      cy.get(".cart-summary__total").should("contain", "$40.00");
      cy.get(".cart-summary__row").should("have.length", 1);
    });
  });

  describe("Cart Navigation", () => {
    it("should navigate to cart from header cart icon", () => {
      // Add item to cart first
      cy.visit("/product/1");
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Navigate to home
      cy.visit("/");

      // Click cart icon in header
      cy.get(".cart").click();

      // Should navigate to cart page
      cy.url().should("include", "/cart");
      cy.get(".cart-page__title").should("contain", "Your Cart");
    });

    it("should show cart badge in header when items are in cart", () => {
      // Add item to cart
      cy.visit("/product/1");
      cy.get(".product-actions").within(() => {
        cy.get("button").contains("ADD TO CART").click();
      });

      // Wait for toast to appear and then dismiss it or wait for it to disappear
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").click(); // Dismiss toast by clicking

      // Navigate to home
      cy.get(".header__link").click();

      // Check that cart badge is displayed
      cy.get(".cart__quantity").should("exist");
      cy.get(".cart__quantity").should("contain", "1");
    });

    it("should update cart badge when items are added", () => {
      // Add first item
      cy.visit("/product/1");
      cy.get("button").contains("ADD TO CART").click();

      // Wait for toast and dismiss it
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").click(); // Dismiss toast

      cy.visit("/"); // Use visit instead of clicking header link
      cy.get(".cart__quantity").should("contain", "1");

      // Navigate to product page
      cy.get(".product").eq(1).click();
      // Add second item
      cy.get("button").contains("ADD TO CART").click();

      // Wait for toast and dismiss it
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").click(); // Dismiss toast

      cy.get(".cart__quantity").should("contain", "2");
    });
  });
});
