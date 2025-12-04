import { create } from "zustand";

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

const useCartStore = create<TCartState>((set, get) => {
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
});

export default useCartStore;
