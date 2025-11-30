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
  quantity: number;
};

type TCartState = {
  items: TCartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getItemById: (productId: number) => TCartItem | undefined;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

const useCartStore = create<TCartState>((set, get) => {
  return {
    items: [],

    addToCart: (productId: number) => {
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }

        return {
          items: [...state.items, { productId, quantity: 1 }],
        };
      });
    },

    removeFromCart: (productId: number) => {
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.productId === productId
        );

        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }

        return {
          items: state.items.filter((item) => item.productId !== productId),
        };
      });
    },

    updateQuantity: (productId: number, quantity: number) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }

      set((state) => ({
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    },

    getItemById: (productId: number) => {
      return get().items.find((item) => item.productId === productId);
    },

    getTotalQuantity: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart: () => {
      set({ items: [] });
    },
  };
});

export default useCartStore;
