import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  title: Record<string, string> // Çoklu dil: { "en": "Olive Oil", "tr": "Zeytinyağı" }
  price: number
  currency: string
  quantity: number
  storeId: string
  storeName: string
  image: string
  isColdChain?: boolean
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === newItem.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'ob-cart-storage', // Tarayıcı hafızasında (LocalStorage) tutulur
    }
  )
)
