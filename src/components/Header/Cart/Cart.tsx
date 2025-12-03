import { Link } from "react-router-dom";
import CartIcon from "@assets/icons/cart.svg";
import useCartStore from "@store/cartStore";
import "./Cart.scss";

function Cart() {
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" className="cart">
      <CartIcon className="cart__icon" />
      {totalQuantity > 0 && (
        <span className="cart__quantity">{totalQuantity}</span>
      )}
    </Link>
  );
}

export default Cart;
