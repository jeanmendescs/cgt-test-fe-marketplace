import { useParams, useNavigate, Navigate } from "react-router-dom";
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
  const { isInCart } = useCartStore();

  const isIdNumber = !isNaN(Number(id));
  if (!isIdNumber) return <Navigate to="/404" replace />;

  const product = getProductById(Number(id));
  if (!product) return <Navigate to="/404" replace />;

  const quantityInCart = isInCart(Number(id)) ? 1 : 0;

  return (
    <div className="product-detail">
      <Button.Outlined
        className="outlined-button outlined-button--back"
        onClick={() => navigate("/")}
        aria-label="Go back to product list"
      >
        <span className="outlined-button__icon" aria-hidden="true">
          ←
        </span>
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
            productName={product.name}
            price={product.price}
            quantityInCart={quantityInCart}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
