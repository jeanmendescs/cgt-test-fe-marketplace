import useCartStore from "@store/cartStore";
import "./ProductActions.scss";
import { Button } from "@components/Button";

type TProductActions = {
  productId: number;
  price: number;
  quantityInCart: number;
};

function ProductActions({ productId, price, quantityInCart }: TProductActions) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const isInCart = quantityInCart > 0;

  const handleAddToCart = () => {
    addToCart(productId);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productId);
  };

  return (
    <div className="product-actions">
      <div className="product-actions__price-wrapper">
        <span className="product-actions__price-label">PRICE</span>
        <span className="product-actions__price">${price.toFixed(2)}</span>
      </div>

      {isInCart ? (
        <Button.Outlined onClick={handleRemoveFromCart}>
          REMOVE FROM CART
        </Button.Outlined>
      ) : (
        <Button.Contained onClick={handleAddToCart}>
          ADD TO CART
        </Button.Contained>
      )}
    </div>
  );
}

export default ProductActions;
