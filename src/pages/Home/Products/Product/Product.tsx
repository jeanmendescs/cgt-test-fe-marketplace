import { Link } from "react-router-dom";
import useCartStore, { TProduct } from "@store/cartStore";
import "./Product.scss";
import { Button } from "@components/Button";
import { memo } from "react";

type TProductProps = TProduct & {
  quantityInCart: number;
};

function Product({
  alt,
  description,
  id,
  image,
  name,
  price,
  quantityInCart,
}: TProductProps) {
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
          />
          {isInCart && <span className="product__badge">{quantityInCart}</span>}
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
            <span className="product__price">${price.toFixed(2)}</span>
            {isInCart ? (
              <Button.Outlined
                className="product__button"
                onClick={handleClick}
              >
                Remove
              </Button.Outlined>
            ) : (
              <Button.Contained
                className="product__button"
                onClick={handleClick}
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
