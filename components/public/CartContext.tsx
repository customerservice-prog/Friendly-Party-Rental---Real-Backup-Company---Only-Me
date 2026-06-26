'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  maxQuantity: number
  picture?: string | null
}

interface CartContextType {
  items: CartItem[]
  eventDate: string | null
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setEventDate: (date: string) => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_KEY = 'fpr_cart'
const DATE_KEY = 'fpr_event_date'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [eventDate, setEventDateState] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      const savedDate = localStorage.getItem(DATE_KEY)
      if (saved) setItems(JSON.parse(saved))
      if (savedDate) setEventDateState(savedDate)
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items, loaded])

  useEffect(() => {
    if (!loaded) return
    if (eventDate) localStorage.setItem(DATE_KEY, eventDate)
  }, [eventDate, loaded])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        const newQty = Math.min(existing.quantity + (item.quantity || 1), item.maxQuantity)
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, i.maxQuantity) } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem(CART_KEY)
  }, [])

  const setEventDate = useCallback((date: string) => {
    setEventDateState(date)
    localStorage.setItem(DATE_KEY, date)
  }, [])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        eventDate,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setEventDate,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
