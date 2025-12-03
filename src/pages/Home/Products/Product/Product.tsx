import useCartStore, { TProduct } from "@store/cartStore";
import "./Product.scss";

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

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
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
        <h2 title={name} className="product__name">
          {name}
        </h2>
        <p title={description} className="product__description">
          {description.slice(0, 100)}...
        </p>

        <div className="product__footer">
          <span className="product__price">${price.toFixed(2)}</span>
          <button className="product__button" onClick={handleClick}>
            {isInCart ? "Remove" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
