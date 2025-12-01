import useCartStore, { TProduct } from "@store/cartStore";

type TProductProps = TProduct & {
  quantityInCart: number;
  index: number;
};

function Product({
  alt,
  description,
  id,
  image,
  name,
  price,
  quantityInCart,
  index,
}: TProductProps) {
  const { addToCart } = useCartStore();

  return (
    <article
      key={id}
      className="product"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product__image-wrapper">
        <img
          src={require(`@assets/images/${image}`)}
          alt={alt}
          className="product__image"
        />
        {quantityInCart > 0 && (
          <span className="product__badge">{quantityInCart}</span>
        )}
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
          <button className="product__button" onClick={() => addToCart(id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
