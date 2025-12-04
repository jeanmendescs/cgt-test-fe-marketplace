import { Link } from "react-router-dom";
import { TProduct } from "@store/cartStore";
import "./CartSummary.scss";
import { Button } from "@components/Button";

type TCartProduct = Pick<TProduct, "id" | "name" | "price">;

type TCartSummaryProps = {
  products: TCartProduct[];
  total: number;
  onClearCart: () => void;
};

function CartSummary({ products, total, onClearCart }: TCartSummaryProps) {
  return (
    <aside className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>

      <div className="cart-summary__rows">
        {products.map((item) => (
          <div key={item.id} className="cart-summary__row">
            <span
              data-testid="cart-summary-name"
              className="cart-summary__name"
            >
              {item.name}
            </span>
            <span data-testid="cart-summary-price">
              ${item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="cart-summary__divider"></div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="cart-summary__actions">
        <Link to="/" className="cart-summary__continue">
          ← Continue Shopping
        </Link>
        <Button.Outlined className="cart-summary__clear" onClick={onClearCart}>
          Clear Cart
        </Button.Outlined>
      </div>
    </aside>
  );
}

export default CartSummary;
