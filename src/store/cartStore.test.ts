import { renderHook, waitFor } from "@testing-library/react";
import useCartStore from "./cartStore";

describe("cartStore", () => {
  beforeEach(() => {
    // Clear localStorage to prevent persistence from affecting tests
    localStorage.clear();
    // Reset the store before each test
    useCartStore.getState().clearCart();
  });

  describe("initial state", () => {
    it("should have an empty items array initially", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.items.size).toBe(0);
    });

    it("should have all required methods", () => {
      const { result } = renderHook(() => useCartStore());

      expect(typeof result.current.addToCart).toBe("function");
      expect(typeof result.current.removeFromCart).toBe("function");
      expect(typeof result.current.isInCart).toBe("function");
      expect(typeof result.current.getTotalQuantity).toBe("function");
      expect(typeof result.current.clearCart).toBe("function");
    });
  });

  describe("addToCart", () => {
    it("should add a product to the cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.items.has(1)).toBe(true);
      });
      expect(result.current.items.size).toBe(1);
    });

    it("should add multiple products to the cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(3);

      await waitFor(() => {
        expect(result.current.items.size).toBe(3);
      });
      expect(result.current.items.has(1)).toBe(true);
      expect(result.current.items.has(2)).toBe(true);
      expect(result.current.items.has(3)).toBe(true);
    });

    it("should not allow duplicate products (Set behavior)", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(1);
      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.items.size).toBe(1);
      });
      expect(result.current.items.has(1)).toBe(true);
    });
  });

  describe("removeFromCart", () => {
    it("should remove a product from the cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.removeFromCart(1);

      await waitFor(() => {
        expect(result.current.items.size).toBe(1);
      });
      expect(result.current.items.has(1)).toBe(false);
      expect(result.current.items.has(2)).toBe(true);
    });

    it("should remove a product when it exists", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(1);
      result.current.addToCart(1);
      result.current.removeFromCart(1);

      await waitFor(() => {
        expect(result.current.items.size).toBe(0);
      });
      expect(result.current.items.has(1)).toBe(false);
    });

    it("should handle removing a non-existent product gracefully", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.removeFromCart(999);

      await waitFor(() => {
        expect(result.current.items.size).toBe(1);
      });
      expect(result.current.items.has(1)).toBe(true);
    });

    it("should handle removing from an empty cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.removeFromCart(1);

      await waitFor(() => {
        expect(result.current.items.size).toBe(0);
      });
    });
  });

  describe("isInCart", () => {
    it("should return true when product is in cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.isInCart(1)).toBe(true);
      });
    });

    it("should return false when product is not in cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.isInCart(2)).toBe(false);
      });
    });

    it("should return false for empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.isInCart(1)).toBe(false);
    });

    it("should return true when product is added multiple times", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(1);
      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.isInCart(1)).toBe(true);
      });
    });
  });

  describe("getTotalQuantity", () => {
    it("should return 0 for empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalQuantity()).toBe(0);
    });

    it("should return correct quantity for single item", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(1);
      });
    });

    it("should return correct quantity for multiple different items", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(3);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(3);
      });
    });

    it("should return 1 when same item added multiple times (Set behavior)", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(1);
      result.current.addToCart(1);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(1);
      });
    });

    it("should update quantity after removing items", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(3);
      result.current.removeFromCart(2);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(2);
      });
    });
  });

  describe("clearCart", () => {
    it("should clear all items from the cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(3);
      result.current.clearCart();

      await waitFor(() => {
        expect(result.current.items.size).toBe(0);
      });
      expect(result.current.getTotalQuantity()).toBe(0);
    });

    it("should handle clearing an already empty cart", async () => {
      const { result } = renderHook(() => useCartStore());

      result.current.clearCart();

      await waitFor(() => {
        expect(result.current.items.size).toBe(0);
      });
    });
  });

  describe("integration scenarios", () => {
    it("should handle complex cart operations", async () => {
      const { result } = renderHook(() => useCartStore());

      // Add items
      result.current.addToCart(1);
      result.current.addToCart(2);
      result.current.addToCart(3);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(3);
      });
      expect(result.current.isInCart(1)).toBe(true);
      expect(result.current.isInCart(2)).toBe(true);
      expect(result.current.isInCart(3)).toBe(true);

      // Remove one item
      result.current.removeFromCart(2);

      await waitFor(() => {
        expect(result.current.getTotalQuantity()).toBe(2);
      });
      expect(result.current.isInCart(2)).toBe(false);
      expect(result.current.isInCart(1)).toBe(true);
      expect(result.current.isInCart(3)).toBe(true);

      // Add more items
      result.current.addToCart(4);
      result.current.addToCart(5);

      await waitFor(() => {
        expect(result.current.items.size).toBe(4);
      });
      expect(result.current.getTotalQuantity()).toBe(4);
      expect(result.current.items.has(1)).toBe(true);
      expect(result.current.items.has(3)).toBe(true);
      expect(result.current.items.has(4)).toBe(true);
      expect(result.current.items.has(5)).toBe(true);

      // Clear cart
      result.current.clearCart();

      await waitFor(() => {
        expect(result.current.items.size).toBe(0);
      });
      expect(result.current.getTotalQuantity()).toBe(0);
    });
  });
});
