import useCartStore, { TProduct } from "@store/cartStore";
import "./CartItem.scss";
import { memo } from "react";

function CartItem({ id, name, price, image, alt }: TProduct) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <article className="cart-item">
      <div className="cart-item__content">
        <div className="cart-item__image-wrapper">
          <img
            src={require(`@assets/images/${image}`)}
            alt={alt}
            className="cart-item__image"
          />
        </div>

        <div className="cart-item__details">
          <h2 title={name} className="cart-item__name">
            {name}
          </h2>
          <p className="cart-item__price">${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="cart-item__subtotal">
        <span className="cart-item__subtotal-label">Subtotal</span>
        <span className="cart-item__subtotal-value">${price.toFixed(2)}</span>
      </div>

      <button
        className="cart-item__remove"
        onClick={() => removeFromCart(id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </article>
  );
}

export default memo(CartItem);
