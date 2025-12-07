import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useProducts from "@contexts/useProducts";
import useCartStore from "@store/cartStore";
import { formatPrice } from "@utils/currencyFormatter";
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

  // Construct full URLs for meta tags
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${baseUrl}/product/${product.id}`;
  const imageUrl = `${baseUrl}${product.src}`;
  const priceFormatted = formatPrice(product.price);
  const description =
    product.description.length > 160
      ? `${product.description.substring(0, 157)}...`
      : product.description;

  return (
    <>
      <Helmet>
        <title>{`${product.name} - ${priceFormatted} | Marketplace`}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta
          property="og:title"
          content={`${product.name} - ${priceFormatted}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={product.alt} />

        {/* X (formerly Twitter) */}
        <meta name="x:card" content="summary_large_image" />
        <meta name="x:url" content={productUrl} />
        <meta name="x:title" content={`${product.name} - ${priceFormatted}`} />
        <meta name="x:description" content={description} />
        <meta name="x:image" content={imageUrl} />
        <meta name="x:image:alt" content={product.alt} />

        {/* Product specific meta tags */}
        <meta name="product:price:amount" content={product.price.toString()} />
        <meta name="product:price:currency" content="USD" />
      </Helmet>

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
            <ProductInfo
              name={product.name}
              description={product.description}
            />
            <ProductActions
              productId={product.id}
              productName={product.name}
              price={product.price}
              quantityInCart={quantityInCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
