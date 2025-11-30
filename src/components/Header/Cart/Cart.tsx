import CartIcon from "@assets/icons/cart.svg";
import useCartStore from "@store/cartStore";
import "./Cart.scss";

function Cart() {
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();

  return (
    <div className="cart">
      <CartIcon className="cart__icon" />
      {totalQuantity > 0 && (
        <span className="cart__quantity">{totalQuantity}</span>
      )}
    </div>
  );
}

export default Cart;
