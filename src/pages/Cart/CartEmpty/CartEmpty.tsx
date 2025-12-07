import { Link } from "react-router-dom";
import "./CartEmpty.scss";

function CartEmpty() {
  return (
    <main>
      <section className="cart-page__container">
        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Cart</h1>
          <p className="cart-page__subtitle">Nothing here yet...</p>
        </div>

        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <p className="cart-empty__text">Your cart is empty</p>
          <Link
            to="/"
            className="cart-empty__btn"
            aria-label="Start shopping and view products"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default CartEmpty;
