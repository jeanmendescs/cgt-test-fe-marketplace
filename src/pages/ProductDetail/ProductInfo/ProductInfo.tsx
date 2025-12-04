import "./ProductInfo.scss";

type TProductInfo = {
  name: string;
  description: string;
};

function ProductInfo({ name, description }: TProductInfo) {
  return (
    <div className="product-info">
      <h1 className="product-info__name">{name}</h1>
      <p className="product-info__description">{description}</p>
    </div>
  );
}

export default ProductInfo;
