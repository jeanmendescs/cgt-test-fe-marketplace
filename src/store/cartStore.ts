import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  src: string;
  alt: string;
};

type TCartState = {
  items: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

const useCartStore = create<TCartState>()(
  persist(
    (set, get) => {
      return {
        items: [],

        addToCart: (productId: number) => {
          set((state) => ({
            items: [...state.items, productId],
          }));
        },

        removeFromCart: (productId: number) => {
          set((state) => ({
            items: state.items.filter((item) => item !== productId),
          }));
        },

        isInCart: (productId: number) => {
          return get().items.includes(productId);
        },

        getTotalQuantity: () => {
          return get().items.length;
        },

        clearCart: () => {
          set({ items: [] });
        },
      };
    },
    {
      name: "cart-storage", // unique name for localStorage key
    }
  )
);

export default useCartStore;
