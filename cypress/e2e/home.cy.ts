/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Page Structure", () => {
    it("should display the home page with correct structure", () => {
      // Check main container
      cy.get(".home").should("exist");
      cy.get(".home-container").should("exist");

      // Check header section
      cy.get(".home__header").should("exist");
      cy.get(".home__title").should("contain", "Our Products");
      cy.get(".home__subtitle").should("contain", "Radical gear from the 90s");
    });

    it("should display products container", () => {
      cy.get(".products").should("exist");
    });
  });

  describe("Products Display", () => {
    it("should display all products from the catalog", () => {
      // Read products from JSON file and verify length matches
      cy.readFile("src/data/PRODUCTS.json").then((products) => {
        cy.get(".product").should("have.length", products.length);
      });
    });

    it("should display product information correctly", () => {
      // Check first product (Product A)
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__image").should("exist");
          cy.get(".product__image").should("have.attr", "alt", "Product A");
          cy.get(".product__name").should("contain", "Product A");
          cy.get(".product__description").should("exist");
          cy.get(".product__price").should("contain", "$30.00");
        });
    });

    it("should display all products with correct names and prices", () => {
      // Check Product A
      cy.get(".product")
        .eq(0)
        .within(() => {
          cy.get(".product__name").should("contain", "Product A");
          cy.get(".product__price").should("contain", "$30.00");
        });

      // Check Product B
      cy.get(".product")
        .eq(1)
        .within(() => {
          cy.get(".product__name").should("contain", "Product B");
          cy.get(".product__price").should("contain", "$40.00");
        });

      // Check Product C
      cy.get(".product")
        .eq(2)
        .within(() => {
          cy.get(".product__name").should("contain", "Product C");
          cy.get(".product__price").should("contain", "$40.00");
        });
    });

    it("should display product images with correct alt text", () => {
      cy.get(".product").each(($product, index) => {
        cy.wrap($product).within(() => {
          cy.get(".product__image").should("exist");
          cy.get(".product__image").should("have.attr", "alt");
        });
      });
    });
  });

  describe("Product Links", () => {
    it("should navigate to product detail page when product is clicked", () => {
      // Click on first product
      cy.get(".product-link").first().click();

      // Should navigate to product detail page
      cy.url().should("include", "/product/1");
      cy.get(".product-detail").should("exist");
    });

    it("should navigate to correct product detail for different products", () => {
      // Click on second product
      cy.get(".product-link").eq(1).click();
      cy.url().should("include", "/product/2");
      cy.get(".product-info__name").should("contain", "Product B");

      // Go back to home
      cy.visit("/");

      // Click on third product
      cy.get(".product-link").eq(2).click();
      cy.url().should("include", "/product/3");
      cy.get(".product-info__name").should("contain", "Product C");
    });
  });

  describe("Add to Cart", () => {
    it("should display 'Add to Cart' button for products not in cart", () => {
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Add to Cart");
          cy.get(".product__badge").should("not.exist");
        });
    });

    it("should add product to cart when 'Add to Cart' button is clicked", () => {
      // Click Add to Cart on first product
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Verify button changes to Remove
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Remove");
          cy.get(".product__badge").should("exist");
          cy.get(".product__badge").should("contain", "1");
        });
    });

    it("should add multiple products to cart", () => {
      // Add first product
      cy.get(".product")
        .eq(0)
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
          cy.get(".product__badge").should("contain", "1");
        });

      // Add second product
      cy.get(".product")
        .eq(1)
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
          cy.get(".product__badge").should("contain", "1");
        });

      // Verify both products show badge
      cy.get(".product__badge").should("have.length", 2);
    });

    it("should update header cart badge when product is added", () => {
      // Initially no badge
      cy.get(".cart__quantity").should("not.exist");

      // Add product to cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Verify header cart badge appears
      cy.get(".cart__quantity").should("exist");
      cy.get(".cart__quantity").should("contain", "1");
    });

    it("should update header cart badge count when multiple products are added", () => {
      // Add first product
      cy.get(".product")
        .eq(0)
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });
      cy.get(".cart__quantity").should("contain", "1");

      // Add second product
      cy.get(".product")
        .eq(1)
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });
      cy.get(".cart__quantity").should("contain", "2");
    });
  });

  describe("Remove from Cart", () => {
    beforeEach(() => {
      cy.visit("/");
      // Add items to cart before each test
      cy.get(".product__button").eq(0).click();
      cy.get(".product__button").eq(1).click();
    });

    it("should display 'Remove' button for products in cart", () => {
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Remove");
        });
    });

    it("should remove product from cart when 'Remove' button is clicked", () => {
      // Click Remove button
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Remove").click();
        });

      // Verify button changes back to Add to Cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Add to Cart");
          cy.get(".product__badge").should("not.exist");
        });
    });

    it("should handle removing one product while others remain in cart", () => {
      // Verify both are in cart
      cy.get(".cart__quantity").should("contain", "2");

      // Remove first product
      cy.get(".product")
        .eq(0)
        .within(() => {
          cy.get(".product__button").contains("Remove").click();
        });

      // Verify first product badge is removed
      cy.get(".product")
        .eq(0)
        .within(() => {
          cy.get(".product__badge").should("not.exist");
        });

      // Verify second product still has badge
      cy.get(".product")
        .eq(1)
        .within(() => {
          cy.get(".product__badge").should("exist");
        });

      // Verify header badge is updated
      cy.get(".cart__quantity").should("contain", "1");
    });
  });

  describe("Cart State Persistence", () => {
    it("should maintain cart state when navigating to product detail and back", () => {
      // Add product to cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Navigate to product detail
      cy.visit("/product/1");

      // Navigate back to home
      cy.get(".outlined-button--back").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      // Verify product is still in cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Remove");
          cy.get(".product__badge").should("exist");
        });
    });

    it("should maintain cart state when navigating to cart page and back", () => {
      // Add product to cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Navigate to cart
      cy.visit("/cart");
      cy.url().should("include", "/cart");

      // Navigate back to home
      cy.visit("/");
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      // Verify product is still in cart
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").should("contain", "Remove");
          cy.get(".product__badge").should("exist");
        });
    });
  });

  describe("Product Interactions", () => {
    it("should allow adding and removing products multiple times", () => {
      const product = cy.get(".product").first();

      // Add to cart
      product.within(() => {
        cy.get(".product__button").contains("Add to Cart").click();
        cy.get(".product__badge").should("exist");
      });

      // Remove from cart
      product.within(() => {
        cy.get(".product__button").contains("Remove").click();
        cy.get(".product__badge").should("not.exist");
      });

      // Add again
      product.within(() => {
        cy.get(".product__button").contains("Add to Cart").click();
        cy.get(".product__badge").should("exist");
      });
    });

    it("should prevent navigation when clicking Add to Cart button", () => {
      // Click Add to Cart button (should not navigate)
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Should still be on home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("should prevent navigation when clicking Remove button", () => {
      // Add product first
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Add to Cart").click();
        });

      // Click Remove button (should not navigate)
      cy.get(".product")
        .first()
        .within(() => {
          cy.get(".product__button").contains("Remove").click();
        });

      // Should still be on home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });
});
