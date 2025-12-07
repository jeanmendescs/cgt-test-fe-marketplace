import useCartStore from "@store/cartStore";
import { formatPrice } from "@utils/currencyFormatter";
import "./ProductActions.scss";
import { Button } from "@components/Button";

type TProductActions = {
  productId: number;
  productName: string;
  price: number;
  quantityInCart: number;
};

function ProductActions({
  productId,
  productName,
  price,
  quantityInCart,
}: TProductActions) {
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
        <span className="product-actions__price">{formatPrice(price)}</span>
      </div>

      {isInCart ? (
        <Button.Outlined
          onClick={handleRemoveFromCart}
          aria-label={`Remove ${productName} from cart`}
        >
          REMOVE FROM CART
        </Button.Outlined>
      ) : (
        <Button.Contained
          onClick={handleAddToCart}
          aria-label={`Add ${productName} to cart`}
        >
          ADD TO CART
        </Button.Contained>
      )}
    </div>
  );
}

export default ProductActions;
