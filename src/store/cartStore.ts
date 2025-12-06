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
  items: Set<number>;
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
        items: new Set<number>(),

        addToCart: (productId: number) => {
          set((state: TCartState) => {
            const items =
              state.items instanceof Set
                ? state.items
                : new Set<number>(
                    Array.isArray(state.items) ? state.items : []
                  );
            return {
              items: new Set<number>(items).add(productId),
            };
          });
        },

        removeFromCart: (productId: number) => {
          set((state: TCartState) => {
            const items =
              state.items instanceof Set
                ? state.items
                : new Set<number>(
                    Array.isArray(state.items) ? state.items : []
                  );
            const newItems = new Set<number>(items);
            newItems.delete(productId);
            return { items: newItems };
          });
        },

        isInCart: (productId: number) => {
          const items = get().items;
          // Ensure items is a Set (in case it was deserialized incorrectly)
          const itemsSet =
            items instanceof Set
              ? items
              : new Set(Array.isArray(items) ? items : []);
          return itemsSet.has(productId);
        },

        getTotalQuantity: () => {
          const items = get().items;
          // Ensure items is a Set (in case it was deserialized incorrectly)
          const itemsSet =
            items instanceof Set
              ? items
              : new Set(Array.isArray(items) ? items : []);
          return itemsSet.size;
        },

        clearCart: () => {
          set({ items: new Set<number>() });
        },
      };
    },
    {
      name: "cart-storage", // unique name for localStorage key
      partialize: (state) => ({
        items: Array.from(state.items),
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as any;
        return {
          ...currentState,
          ...persisted,
          items:
            persisted?.items && Array.isArray(persisted.items)
              ? new Set(persisted.items)
              : new Set<number>(),
        };
      },
    }
  )
);

export default useCartStore;
