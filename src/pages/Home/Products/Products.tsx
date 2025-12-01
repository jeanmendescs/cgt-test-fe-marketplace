import useProducts from "@contexts/useProducts";
import useCartStore from "@store/cartStore";
import "./Products.scss";
import Product from "./Product/Product";

function Products() {
  const { products } = useProducts();
  const { getItemById } = useCartStore();

  return (
    <div className="products">
      {products.map((product, index) => {
        const cartItem = getItemById(product.id);
        const quantityInCart = cartItem?.quantity || 0;

        return (
          <Product
            key={product.id}
            {...product}
            quantityInCart={quantityInCart}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default Products;
