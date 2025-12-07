import { formatPrice } from "./currencyFormatter";

describe("formatPrice", () => {
  describe("basic formatting", () => {
    it("formats whole numbers correctly", () => {
      expect(formatPrice(10)).toBe("$10.00");
      expect(formatPrice(100)).toBe("$100.00");
      expect(formatPrice(0)).toBe("$0.00");
    });

    it("formats decimal numbers correctly", () => {
      expect(formatPrice(29.99)).toBe("$29.99");
      expect(formatPrice(10.5)).toBe("$10.50");
      expect(formatPrice(0.99)).toBe("$0.99");
    });

    it("formats numbers with more than 2 decimal places by rounding", () => {
      expect(formatPrice(10.999)).toBe("$11.00");
      expect(formatPrice(10.995)).toBe("$10.99");
      expect(formatPrice(10.994)).toBe("$10.99");
      expect(formatPrice(29.999)).toBe("$30.00");
    });
  });

  describe("edge cases", () => {
    it("handles zero correctly", () => {
      expect(formatPrice(0)).toBe("$0.00");
    });

    it("handles negative numbers", () => {
      expect(formatPrice(-10)).toBe("$-10.00");
      expect(formatPrice(-29.99)).toBe("$-29.99");
    });

    it("handles very large numbers", () => {
      expect(formatPrice(1000000)).toBe("$1000000.00");
      expect(formatPrice(999999.99)).toBe("$999999.99");
    });

    it("handles very small decimal numbers", () => {
      expect(formatPrice(0.01)).toBe("$0.01");
      expect(formatPrice(0.001)).toBe("$0.00");
      expect(formatPrice(0.005)).toBe("$0.01");
    });
  });
});
