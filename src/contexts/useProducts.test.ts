import { renderHook } from "@testing-library/react";
import useProducts from "./useProducts";
import PRODUCTS from "@data/PRODUCTS.json";

describe("useProducts", () => {
  it("returns all products", () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toBeDefined();
    expect(Array.isArray(result.current.products)).toBe(true);
    expect(result.current.products.length).toBe(PRODUCTS.length);
    expect(result.current.products).toEqual(PRODUCTS);
  });

  it("returns getProductById function", () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.getProductById).toBeDefined();
    expect(typeof result.current.getProductById).toBe("function");
  });

  it("getProductById returns the correct product when id exists", () => {
    const { result } = renderHook(() => useProducts());

    const product = result.current.getProductById(1);

    expect(product).toBeDefined();
    expect(product?.id).toBe(1);
    expect(product?.name).toBe("Product A");
    expect(product).toEqual(PRODUCTS[0]);
  });

  it("getProductById returns the correct product for different ids", () => {
    const { result } = renderHook(() => useProducts());

    const product2 = result.current.getProductById(2);
    const product5 = result.current.getProductById(5);

    expect(product2?.id).toBe(2);
    expect(product2?.name).toBe("Product B");
    expect(product5?.id).toBe(5);
    expect(product5?.name).toBe("Product E");
  });

  it("getProductById returns undefined when id does not exist", () => {
    const { result } = renderHook(() => useProducts());

    const product = result.current.getProductById(999);

    expect(product).toBeUndefined();
  });

  it("products have the correct TProduct structure", () => {
    const { result } = renderHook(() => useProducts());

    const product = result.current.products[0];

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("image");
    expect(product).toHaveProperty("src");
    expect(product).toHaveProperty("alt");

    expect(typeof product.id).toBe("number");
    expect(typeof product.name).toBe("string");
    expect(typeof product.description).toBe("string");
    expect(typeof product.price).toBe("number");
    expect(typeof product.image).toBe("string");
    expect(typeof product.src).toBe("string");
    expect(typeof product.alt).toBe("string");
  });
});
