import useProducts from "@contexts/useProducts";
import useCartStore from "@store/cartStore";
import "./Products.scss";
import Product from "./Product/Product";

function Products() {
  const { products } = useProducts();
  const { isInCart } = useCartStore();

  return (
    <div className="products">
      {products.map((product, index) => {
        const cartItem = isInCart(product.id);
        const quantityInCart = cartItem ? 1 : 0;

        return (
          <Product
            key={product.id}
            quantityInCart={quantityInCart}
            index={index}
            {...product}
          />
        );
      })}
    </div>
  );
}

export default Products;
