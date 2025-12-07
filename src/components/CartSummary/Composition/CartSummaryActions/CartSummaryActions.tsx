import { Button } from "@components/Button";
import { Link, useNavigate } from "react-router-dom";
import "./CartSummaryActions.scss";

type TCartSummaryActions = {
  onClearCart: () => void;
};

export function Actions({ onClearCart }: TCartSummaryActions) {
  const navigate = useNavigate();

  return (
    <div className="cart-summary__actions">
      <Button.Contained
        className="cart-summary__checkout"
        onClick={() => navigate("/checkout")}
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </Button.Contained>
      <div className="cart-summary__actions-row">
        <Link
          to="/"
          className="cart-summary__continue"
          aria-label="Continue shopping and return to product list"
        >
          ← Continue Shopping
        </Link>
        <Button.Outlined
          className="cart-summary__clear"
          onClick={onClearCart}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </Button.Outlined>
      </div>
    </div>
  );
}
