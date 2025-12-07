/// <reference types="cypress" />

describe("Checkout Page", () => {
  beforeEach(() => {
    // Clear cart and visit home page
    cy.visit("/");
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe("Navigation and Empty Cart", () => {
    it("should redirect to cart when accessing checkout with empty cart", () => {
      cy.visit("/checkout");

      // Should redirect to cart page
      cy.url().should("include", "/cart");
      cy.get(".cart-page__title").should("contain", "Your Cart");
    });

    it("should navigate to checkout from cart page", () => {
      // Add items to cart first
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click(); // Dismiss toast

      // Navigate to cart
      cy.visit("/cart");

      // Click proceed to checkout button
      cy.get(".cart-summary__checkout").click();

      // Should navigate to checkout page
      cy.url().should("include", "/checkout");
      cy.get(".checkout-page__title").should("contain", "Checkout");
    });
  });

  describe("Checkout Page Rendering", () => {
    beforeEach(() => {
      // Add items to cart before each test
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click(); // Dismiss toast

      cy.get(".product__button").eq(1).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click(); // Dismiss toast

      cy.visit("/checkout");
    });

    it("should display checkout page title", () => {
      cy.get(".checkout-page__container").should("exist");
      cy.get(".checkout-page__title").should("contain", "Checkout");
    });

    it("should display shipping information section", () => {
      cy.get(".checkout-form__section")
        .first()
        .within(() => {
          cy.get(".checkout-form__section-title").should(
            "contain",
            "Shipping Information"
          );
          cy.get('label[for="fullName"]').should("contain", "Full Name");
          cy.get('label[for="email"]').should("contain", "Email");
          cy.get('label[for="address"]').should("contain", "Address");
          cy.get('label[for="city"]').should("contain", "City");
          cy.get('label[for="state"]').should("contain", "State");
          cy.get('label[for="zipCode"]').should("contain", "ZIP Code");
          cy.get('label[for="country"]').should("contain", "Country");
        });
    });

    it("should display payment information section", () => {
      cy.get(".checkout-form__section")
        .eq(1)
        .within(() => {
          cy.get(".checkout-form__section-title").should(
            "contain",
            "Payment Information"
          );
          cy.get('label[for="cardNumber"]').should("contain", "Card Number");
          cy.get('label[for="cardName"]').should("contain", "Cardholder Name");
          cy.get('label[for="expiryDate"]').should("contain", "Expiry Date");
          cy.get('label[for="cvv"]').should("contain", "CVV");
        });
    });

    it("should display action buttons", () => {
      cy.get(".checkout-form__actions").should("exist");
      cy.get('button[aria-label="Go back to cart"]').should(
        "contain",
        "← Back to Cart"
      );
      cy.get('button[aria-label="Complete purchase"]').should(
        "contain",
        "Complete Purchase"
      );
    });

    it("should display cart summary with products", () => {
      cy.get(".cart-summary").should("exist");
      cy.get(".cart-summary__title").should("contain", "Order Summary");

      // Check that products are displayed
      cy.get('[data-testid="cart-summary-name"]').should("have.length", 2);
      cy.get('[data-testid="cart-summary-price"]').should("have.length", 2); // 2 products
      cy.get('[data-testid="cart-summary-total"]').should("exist"); // 1 total
    });

    it("should display correct total in cart summary", () => {
      // Product A ($30) + Product B ($40) = $70
      cy.get(".cart-summary__total").should("contain", "$70.00");
    });
  });

  describe("Form Validation - Shipping Information", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.visit("/checkout");
    });

    it("should show error when full name is empty", () => {
      cy.get('input[id="fullName"]').focus().blur();
      cy.get("#fullName-error").should("contain", "Full name is required");
      cy.get('input[id="fullName"]').should(
        "have.class",
        "checkout-form__input--error"
      );
    });

    it("should show error when full name is too short", () => {
      cy.get('input[id="fullName"]').type("A").blur();
      cy.get("#fullName-error").should(
        "contain",
        "Full name must be at least 2 characters"
      );
    });

    it("should show error when email is empty", () => {
      cy.get('input[id="email"]').focus().blur();
      cy.get("#email-error").should("contain", "Email is required");
    });

    it("should show error when email is invalid", () => {
      cy.get('input[id="email"]').type("invalid-email").blur();
      cy.get("#email-error").should(
        "contain",
        "Please enter a valid email address"
      );
    });

    it("should show error when address is empty", () => {
      cy.get('input[id="address"]').focus().blur();
      cy.get("#address-error").should("contain", "Address is required");
    });

    it("should show error when address is too short", () => {
      cy.get('input[id="address"]').type("123").blur();
      cy.get("#address-error").should(
        "contain",
        "Address must be at least 5 characters"
      );
    });

    it("should show error when city is empty", () => {
      cy.get('input[id="city"]').focus().blur();
      cy.get("#city-error").should("contain", "City is required");
    });

    it("should show error when state is empty", () => {
      cy.get('input[id="state"]').focus().blur();
      cy.get("#state-error").should("contain", "State is required");
    });

    it("should show error when zip code is empty", () => {
      cy.get('input[id="zipCode"]').focus().blur();
      cy.get("#zipCode-error").should("contain", "ZIP code is required");
    });

    it("should show error when zip code contains non-numeric characters", () => {
      // When typing "abc12", the formatter removes non-numeric chars, leaving "12"
      // which is less than 5 digits, so it shows the minLength error
      cy.get('input[id="zipCode"]').type("abc12").blur();
      cy.get("#zipCode-error").should(
        "contain",
        "ZIP code must be at least 5 digits"
      );
    });

    it("should show error when zip code is too short", () => {
      cy.get('input[id="zipCode"]').type("1234").blur();
      cy.get("#zipCode-error").should(
        "contain",
        "ZIP code must be at least 5 digits"
      );
    });

    it("should format zip code to numeric only", () => {
      cy.get('input[id="zipCode"]').type("12345abc");
      cy.get('input[id="zipCode"]').should("have.value", "12345");
    });

    it("should show error when country is empty", () => {
      cy.get('input[id="country"]').focus().blur();
      cy.get("#country-error").should("contain", "Country is required");
    });
  });

  describe("Form Validation - Payment Information", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.visit("/checkout");
    });

    it("should show error when card number is empty", () => {
      cy.get('input[id="cardNumber"]').focus().blur();
      cy.get("#cardNumber-error").should("contain", "Card number is required");
    });

    it("should show error when card number is too short", () => {
      cy.get('input[id="cardNumber"]').type("123456789012").blur();
      cy.get("#cardNumber-error").should(
        "contain",
        "Please enter a valid card number (13-16 digits)"
      );
    });

    it("should format card number with spaces", () => {
      cy.get('input[id="cardNumber"]').type("1234567890123456");
      cy.get('input[id="cardNumber"]').should(
        "have.value",
        "1234 5678 9012 3456"
      );
    });

    it("should show error when cardholder name is empty", () => {
      cy.get('input[id="cardName"]').focus().blur();
      cy.get("#cardName-error").should(
        "contain",
        "Cardholder name is required"
      );
    });

    it("should show error when expiry date is empty", () => {
      cy.get('input[id="expiryDate"]').focus().blur();
      cy.get("#expiryDate-error").should("contain", "Expiry date is required");
    });

    it("should show error when expiry date format is invalid", () => {
      cy.get('input[id="expiryDate"]').type("12/2").blur();
      cy.get("#expiryDate-error").should(
        "contain",
        "Please enter a valid expiry date (MM/YY)"
      );
    });

    it("should show error when expiry month is invalid", () => {
      cy.get('input[id="expiryDate"]').type("13/25").blur();
      cy.get("#expiryDate-error").should(
        "contain",
        "Month must be between 01 and 12"
      );
    });

    it("should show error when expiry date is in the past", () => {
      cy.get('input[id="expiryDate"]').type("01/20").blur();
      cy.get("#expiryDate-error").should(
        "contain",
        "Expiry date cannot be in the past"
      );
    });

    it("should show error when CVV is empty", () => {
      cy.get('input[id="cvv"]').focus().blur();
      cy.get("#cvv-error").should("contain", "CVV is required");
    });

    it("should show error when CVV is invalid", () => {
      cy.get('input[id="cvv"]').type("12").blur();
      cy.get("#cvv-error").should(
        "contain",
        "Please enter a valid CVV (3-4 digits)"
      );
    });

    it("should format CVV to numeric only", () => {
      cy.get('input[id="cvv"]').type("123abc");
      cy.get('input[id="cvv"]').should("have.value", "123");
    });
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.visit("/checkout");
    });

    const fillValidForm = () => {
      cy.get('input[id="fullName"]').type("John Doe");
      cy.get('input[id="email"]').type("john@example.com");
      cy.get('input[id="address"]').type("123 Main Street");
      cy.get('input[id="city"]').type("New York");
      cy.get('input[id="state"]').type("NY");
      cy.get('input[id="zipCode"]').type("10001");
      cy.get('input[id="country"]').type("USA");
      cy.get('input[id="cardNumber"]').type("1234567890123456");
      cy.get('input[id="cardName"]').type("John Doe");

      // Get future expiry date
      const currentYear = new Date().getFullYear();
      const futureYear = (currentYear % 100) + 5;
      cy.get('input[id="expiryDate"]').type(`12/${futureYear}`);

      cy.get('input[id="cvv"]').type("123");
    };

    it("should submit form with valid data and navigate to success page", () => {
      fillValidForm();

      cy.get('button[aria-label="Complete purchase"]').click();

      // Should navigate to success page
      cy.url().should("include", "/checkout/success");
      cy.get(".checkout-success__title").should("contain", "Order Confirmed!");
    });

    it("should show success toast notification", () => {
      fillValidForm();

      cy.get('button[aria-label="Complete purchase"]').click();

      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").should(
        "contain",
        "Order placed successfully!"
      );
    });

    it("should not submit form with invalid data", () => {
      // Fill only some fields
      cy.get('input[id="fullName"]').type("John Doe");
      // Leave email empty

      cy.get('button[aria-label="Complete purchase"]').click();

      // Should still be on checkout page
      cy.url().should("include", "/checkout");
      cy.get("#email-error").should("contain", "Email is required");
    });

    it("should show multiple validation errors when multiple fields are invalid", () => {
      cy.get('button[aria-label="Complete purchase"]').click();

      // Should show multiple errors
      cy.get("#fullName-error").should("exist");
      cy.get("#email-error").should("exist");
      cy.get("#address-error").should("exist");
      cy.get("#cardNumber-error").should("exist");
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.visit("/checkout");
    });

    it("should navigate to cart when 'Back to Cart' button is clicked", () => {
      cy.get('button[aria-label="Go back to cart"]').click();

      cy.url().should("include", "/cart");
      cy.get(".cart-page__title").should("contain", "Your Cart");
    });

    it("should preserve cart items when navigating back to cart", () => {
      cy.get('button[aria-label="Go back to cart"]').click();

      // Verify cart still has items
      cy.get(".cart-item").should("have.length", 1);
      cy.get(".cart-summary__total").should("contain", "$30.00");
    });
  });

  describe("Cart Summary Integration", () => {
    it("should display correct products in cart summary", () => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.get(".product__button").eq(1).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();

      cy.visit("/checkout");

      // Check products are displayed
      cy.get('[data-testid="cart-summary-name"]').should("have.length", 2);
      cy.get('[data-testid="cart-summary-name"]')
        .first()
        .should("contain", "Product A");
      cy.get('[data-testid="cart-summary-name"]')
        .eq(1)
        .should("contain", "Product B");
    });

    it("should display correct total for multiple products", () => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.get(".product__button").eq(1).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();

      cy.visit("/checkout");

      // Product A ($30) + Product B ($40) = $70
      cy.get(".cart-summary__total").should("contain", "$70.00");
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".product__button").eq(0).click();
      cy.get(".Toastify__toast--success").should("exist");
      cy.get(".Toastify__toast--success").first().click();
      cy.visit("/checkout");
    });

    it("should have proper aria labels on form inputs", () => {
      cy.get('input[id="fullName"]').should(
        "have.attr",
        "aria-invalid",
        "false"
      );
      cy.get('input[id="email"]').should("have.attr", "aria-invalid", "false");
    });

    it("should set aria-invalid when field has error", () => {
      cy.get('input[id="fullName"]').focus().blur();
      cy.get('input[id="fullName"]').should(
        "have.attr",
        "aria-invalid",
        "true"
      );
    });

    it("should have aria-describedby for error messages", () => {
      cy.get('input[id="fullName"]').focus().blur();
      cy.get('input[id="fullName"]').should(
        "have.attr",
        "aria-describedby",
        "fullName-error"
      );
      cy.get("#fullName-error").should("exist");
    });

    it("should have role='alert' on error messages", () => {
      cy.get('input[id="fullName"]').focus().blur();
      cy.get("#fullName-error").should("have.attr", "role", "alert");
    });
  });
});
