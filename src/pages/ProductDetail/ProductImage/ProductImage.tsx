import "./ProductImage.scss";

type TProductImage = {
  image: string;
  alt: string;
  quantityInCart: number;
};

function ProductImage({ image, alt, quantityInCart }: TProductImage) {
  return (
    <div className="product-image">
      <div className="product-image__wrapper">
        <img
          src={require(`@assets/images/${image}`)}
          alt={alt}
          className="product-image__img"
        />
        {quantityInCart > 0 && (
          <span className="product-image__badge">{quantityInCart}</span>
        )}
      </div>
    </div>
  );
}

export default ProductImage;
