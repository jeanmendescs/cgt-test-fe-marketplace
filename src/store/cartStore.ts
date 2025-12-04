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

export type TCartItem = {
  productId: number;
};

type TCartState = {
  items: TCartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  getItemById: (productId: number) => TCartItem | undefined;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

const useCartStore = create<TCartState>((set, get) => {
  return {
    items: [],

    addToCart: (productId: number) => {
      set((state) => ({
        items: [...state.items, { productId }],
      }));
    },

    removeFromCart: (productId: number) => {
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
      }));
    },

    getItemById: (productId: number) => {
      return get().items.find((item) => item.productId === productId);
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
