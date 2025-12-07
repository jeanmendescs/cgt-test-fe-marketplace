import useCartStore, { TProduct } from "@store/cartStore";
import useProducts from "@contexts/useProducts";
import CartItem from "./CartItem/CartItem";
import CartEmpty from "./CartEmpty/CartEmpty";
import "./Cart.scss";
import { Helmet } from "react-helmet-async";
import { CartSummary } from "@components/CartSummary/CartSummary";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { getProductById } = useProducts();

  const cartProducts = Array.from(items)
    .map((item) => getProductById(item))
    .filter((product): product is TProduct => product !== undefined);
  const total = cartProducts.reduce((sum, item) => sum + item.price, 0);

  if (items.size === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <Helmet>
        <title>Your Cart - 90s Marketplace</title>
        <meta
          name="description"
          content="Your shopping cart at 90s Marketplace"
        />
      </Helmet>
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

            <CartSummary.Root>
              <CartSummary.Body products={cartProducts} total={total} />
              <CartSummary.Actions onClearCart={clearCart} />
            </CartSummary.Root>
          </div>
        </section>
      </main>
    </>
  );
}

export default CartPage;
