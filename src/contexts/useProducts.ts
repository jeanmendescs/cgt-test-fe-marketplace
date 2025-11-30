import PRODUCTS from "@data/products.json";
import { TProduct } from "@store/cartStore";

export const useProducts = () => {
  const products = PRODUCTS as TProduct[];

  const getProductById = (id: number): TProduct | undefined => {
    return products.find((product) => product.id === id);
  };

  return {
    products,
    getProductById,
  };
};

