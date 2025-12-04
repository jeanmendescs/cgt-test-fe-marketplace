import { useParams, useNavigate } from "react-router-dom";
import useProducts from "@contexts/useProducts";
import useCartStore from "@store/cartStore";
import ProductImage from "./ProductImage/ProductImage";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductActions from "./ProductActions/ProductActions";
import { Button } from "@components/Button";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const cartItems = useCartStore((state) => state.items);

  const product = getProductById(Number(id));
  const cartItem = cartItems.find((item) => item.productId === Number(id));
  const quantityInCart = cartItem ? 1 : 0;

  if (!product) {
    return (
      <div className="product-detail product-detail--not-found">
        <h1>Product not found</h1>
        <Button.Outlined
          className="outlined-button outlined-button--back"
          onClick={() => navigate("/")}
        >
          <span className="outlined-button__icon">←</span>
          Back
        </Button.Outlined>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Button.Outlined
        className="outlined-button outlined-button--back"
        onClick={() => navigate("/")}
      >
        <span className="outlined-button__icon">←</span>
        Back
      </Button.Outlined>

      <div className="product-detail__container">
        <ProductImage
          image={product.image}
          alt={product.alt}
          quantityInCart={quantityInCart}
        />

        <div className="product-detail__content">
          <ProductInfo name={product.name} description={product.description} />
          <ProductActions
            productId={product.id}
            price={product.price}
            quantityInCart={quantityInCart}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
