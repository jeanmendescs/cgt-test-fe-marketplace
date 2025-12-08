import { renderHook, waitFor, act } from "@testing-library/react";
import useViewport from "./useViewport";
import { breakpoints } from "constants/constants";

describe("useViewport", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window size before each test
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  afterAll(() => {
    // Restore original window size after all tests
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe("'above' direction", () => {
    it("returns true when viewport is above breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useViewport("above", "md"));

      expect(result.current).toBe(true); // 1000 >= 900
    });

    it("returns false when viewport is below breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { result } = renderHook(() => useViewport("above", "md"));

      expect(result.current).toBe(false); // 800 < 900
    });

    it("returns true when viewport equals breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.md,
      });

      const { result } = renderHook(() => useViewport("above", "md"));

      expect(result.current).toBe(true); // 900 >= 900
    });

    it("returns true when viewport is above pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });

      const { result } = renderHook(() => useViewport("above", 1000));

      expect(result.current).toBe(true); // 1200 >= 1000
    });

    it("returns false when viewport is below pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { result } = renderHook(() => useViewport("above", 1000));

      expect(result.current).toBe(false); // 800 < 1000
    });

    it("returns true when viewport equals pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useViewport("above", 1000));

      expect(result.current).toBe(true); // 1000 >= 1000
    });

    it("works with all breakpoint keys", () => {
      // Test sm
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.sm + 100,
      });
      const { result: resultSm } = renderHook(() => useViewport("above", "sm"));
      expect(resultSm.current).toBe(true);

      // Test md
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.md + 100,
      });
      const { result: resultMd } = renderHook(() => useViewport("above", "md"));
      expect(resultMd.current).toBe(true);

      // Test lg
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.lg + 100,
      });
      const { result: resultLg } = renderHook(() => useViewport("above", "lg"));
      expect(resultLg.current).toBe(true);

      // Test xl
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.xl + 100,
      });
      const { result: resultXl } = renderHook(() => useViewport("above", "xl"));
      expect(resultXl.current).toBe(true);

      // Test xxl
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.xxl + 100,
      });
      const { result: resultXxl } = renderHook(() =>
        useViewport("above", "xxl")
      );
      expect(resultXxl.current).toBe(true);
    });
  });

  describe("'below' direction", () => {
    it("returns true when viewport is below breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { result } = renderHook(() => useViewport("below", "md"));

      expect(result.current).toBe(true); // 800 < 900
    });

    it("returns false when viewport is above breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useViewport("below", "md"));

      expect(result.current).toBe(false); // 1000 >= 900
    });

    it("returns false when viewport equals breakpoint key", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.md,
      });

      const { result } = renderHook(() => useViewport("below", "md"));

      expect(result.current).toBe(false); // 900 is not < 900
    });

    it("returns true when viewport is below pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { result } = renderHook(() => useViewport("below", 1000));

      expect(result.current).toBe(true); // 800 < 1000
    });

    it("returns false when viewport is above pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });

      const { result } = renderHook(() => useViewport("below", 1000));

      expect(result.current).toBe(false); // 1200 >= 1000
    });

    it("returns false when viewport equals pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });

      const { result } = renderHook(() => useViewport("below", 1000));

      expect(result.current).toBe(false); // 1000 is not < 1000
    });

    it("works with all breakpoint keys", () => {
      // Test sm
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.sm - 100,
      });
      const { result: resultSm } = renderHook(() => useViewport("below", "sm"));
      expect(resultSm.current).toBe(true);

      // Test md
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.md - 100,
      });
      const { result: resultMd } = renderHook(() => useViewport("below", "md"));
      expect(resultMd.current).toBe(true);

      // Test lg
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.lg - 100,
      });
      const { result: resultLg } = renderHook(() => useViewport("below", "lg"));
      expect(resultLg.current).toBe(true);

      // Test xl
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.xl - 100,
      });
      const { result: resultXl } = renderHook(() => useViewport("below", "xl"));
      expect(resultXl.current).toBe(true);

      // Test xxl
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: breakpoints.xxl - 100,
      });
      const { result: resultXxl } = renderHook(() =>
        useViewport("below", "xxl")
      );
      expect(resultXxl.current).toBe(true);
    });
  });

  describe("resize events", () => {
    it("updates when window is resized", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { result } = renderHook(() => useViewport("above", "md"));

      expect(result.current).toBe(false); // 800 < 900

      // Simulate resize
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      await waitFor(() => {
        expect(result.current).toBe(true); // 1000 >= 900
      });
    });

    it("updates multiple times on resize", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });

      const { result } = renderHook(() => useViewport("above", "md"));

      expect(result.current).toBe(false); // 500 < 900

      // First resize
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      await waitFor(() => {
        expect(result.current).toBe(true); // 1000 >= 900
      });

      // Second resize
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      await waitFor(() => {
        expect(result.current).toBe(false); // 800 < 900
      });
    });
  });

  describe("edge cases", () => {
    it("handles very small viewport", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 100,
      });

      const { result } = renderHook(() => useViewport("above", "sm"));

      expect(result.current).toBe(false); // 100 < 600
    });

    it("handles very large viewport", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 3000,
      });

      const { result } = renderHook(() => useViewport("below", "xxl"));

      expect(result.current).toBe(false); // 3000 >= 1920
    });

    it("handles zero pixel value", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 100,
      });

      const { result: resultAbove } = renderHook(() => useViewport("above", 0));
      expect(resultAbove.current).toBe(true); // 100 >= 0

      const { result: resultBelow } = renderHook(() => useViewport("below", 0));
      expect(resultBelow.current).toBe(false); // 100 is not < 0
    });
  });

  describe("cleanup", () => {
    it("removes event listener on unmount", () => {
      const addEventListenerSpy = jest.spyOn(window, "addEventListener");
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useViewport("above", "md"));

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});
