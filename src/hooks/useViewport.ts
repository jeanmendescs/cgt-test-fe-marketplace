import { breakpoints } from "constants/constants";
import { useEffect, useMemo, useState } from "react";

export type Breakpoints = typeof breakpoints;

export type BreakpointKey = keyof Breakpoints;

export type ViewportDirection = "above" | "below";

/**
 * Custom hook that checks if the current viewport is above or below a specified breakpoint.
 * Uses breakpoints from ./breakpoints.
 *
 * @param direction - Either 'above' or 'below' to specify the check direction
 * @param value - Breakpoint key (e.g., 'md', 'lg') or pixel value
 * @returns Boolean indicating if the viewport matches the condition
 *
 * @example
 * // Check if viewport is above 'md' breakpoint
 * const isAboveMd = useViewport('above', 'md');
 *
 * // Check if viewport is below 1200px
 * const isBelow1200 = useViewport('below', 1200);
 */
function useViewport(
  direction: ViewportDirection,
  value: BreakpointKey | number
): boolean {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    const breakpointValue =
      typeof value === "number" ? value : breakpoints[value];

    if (direction === "above") {
      return width >= breakpointValue;
    }
    return width < breakpointValue;
  }, [width, direction, value]);
}

export default useViewport;
