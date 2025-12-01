import PRODUCTS from "@data/PRODUCTS.json";
import { TProduct } from "@store/cartStore";

const useProducts = () => {
  const products = PRODUCTS as TProduct[];

  const getProductById = (id: number): TProduct | undefined => {
    return products.find((product) => product.id === id);
  };

  return {
    products,
    getProductById,
  };
};

export default useProducts;
