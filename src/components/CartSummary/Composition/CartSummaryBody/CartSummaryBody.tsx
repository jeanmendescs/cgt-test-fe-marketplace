import { TProduct } from "@store/cartStore";
import { formatPrice } from "@utils/currencyFormatter";
import "./CartSummaryBody.scss";

type TCartSummaryBody = {
  products: TProduct[];
  total: number;
};

export function Body({ products, total }: TCartSummaryBody) {
  return (
    <>
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
              {formatPrice(item.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="cart-summary__divider"></div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
}
