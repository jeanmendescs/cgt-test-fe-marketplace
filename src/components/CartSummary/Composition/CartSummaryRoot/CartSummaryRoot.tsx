import React from "react";
import "./CartSummaryRoot.scss";

type TCartSummaryRoot = {
  children: React.ReactNode;
};

export function Root({ children }: TCartSummaryRoot) {
  return <aside className="cart-summary">{children}</aside>;
}
