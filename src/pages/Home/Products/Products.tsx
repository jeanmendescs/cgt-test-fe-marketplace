import useProducts from "@contexts/useProducts";
import useCartStore from "@store/cartStore";
import "./Products.scss";
import Product from "./Product/Product";

function Products() {
  const { products } = useProducts();
  const { getItemById } = useCartStore();

  return (
    <div className="products">
      {products.map((product) => {
        const cartItem = getItemById(product.id);
        const quantityInCart = cartItem?.quantity || 0;

        return (
          <Product
            key={product.id}
            quantityInCart={quantityInCart}
            {...product}
          />
        );
      })}
    </div>
  );
}

export default Products;
