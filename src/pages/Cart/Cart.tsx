import useCartStore, { TProduct } from "@store/cartStore";
import useProducts from "@contexts/useProducts";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import CartEmpty from "./CartEmpty/CartEmpty";
import "./Cart.scss";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { getProductById } = useProducts();

  const cartProducts = items.map((item) =>
    getProductById(item.productId)
  ) as TProduct[];
  const total = cartProducts.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <main>
      <section className="cart-page__container">
        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Cart</h1>
        </div>

        <div className="cart-page__content">
          <div className="cart-page__items">
            {cartProducts.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <CartSummary
            products={cartProducts}
            total={total}
            onClearCart={clearCart}
          />
        </div>
      </section>
    </main>
  );
}

export default CartPage;
