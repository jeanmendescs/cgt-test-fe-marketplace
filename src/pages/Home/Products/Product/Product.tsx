import { Link } from "react-router-dom";
import useCartStore, { TProduct } from "@store/cartStore";
import { formatPrice } from "@utils/currencyFormatter";
import "./Product.scss";
import { Button } from "@components/Button";
import { memo } from "react";
import useViewport from "hooks/useViewport";

type TProductProps = TProduct & {
  quantityInCart: number;
  index?: number;
};

function Product({
  alt,
  description,
  id,
  image,
  name,
  price,
  quantityInCart,
  index = 0,
}: TProductProps) {
  const isAboveLargeScreenSize = useViewport("above", "lg");
  const isBelowLargeScreenSize = useViewport("below", "lg");
  const isBelowSmallScreenSize = useViewport("below", "sm");

  const handleImageLoading = () => {
    // only the visible products in the first row of each breakpoints should be loaded eagerly
    if (isBelowSmallScreenSize) {
      return index === 0 ? "eager" : "lazy";
    }

    if (index <= 2 && isAboveLargeScreenSize) return "eager";
    if (index <= 1 && isBelowLargeScreenSize) return "eager";
    return "lazy";
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = quantityInCart > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="product-link">
      <article key={id} className="product">
        <div className="product__image-wrapper">
          <img
            src={require(`@assets/images/${image}`)}
            alt={alt}
            className="product__image"
            loading={handleImageLoading()}
          />
          {isInCart && (
            <span
              className="product__badge"
              aria-label={`${quantityInCart} of ${name} in cart`}
            >
              {quantityInCart}
            </span>
          )}
        </div>

        <div className="product__content">
          <div className="product__header">
            <h2 title={name} className="product__name">
              {name}
            </h2>
            <p title={description} className="product__description">
              {description}
            </p>
          </div>

          <div className="product__footer">
            <span className="product__price">{formatPrice(price)}</span>
            {isInCart ? (
              <Button.Outlined
                className="product__button"
                onClick={handleClick}
                aria-label={`Remove ${name} from cart`}
              >
                Remove
              </Button.Outlined>
            ) : (
              <Button.Contained
                className="product__button"
                onClick={handleClick}
                aria-label={`Add ${name} to cart`}
              >
                Add to Cart
              </Button.Contained>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default memo(Product);
