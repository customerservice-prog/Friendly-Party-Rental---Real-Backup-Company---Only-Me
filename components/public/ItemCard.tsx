'use client'

import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart } from './CartContext'
import { formatCurrency } from '@/lib/utils'

interface ItemCardProps {
  id: string
  name: string
  cost: number
  picture?: string | null
  available: number
}

export default function ItemCard({ id, name, cost, picture, available }: ItemCardProps) {
  const { addItem } = useCart()

  const handleAdd = () => {
    if (available <= 0) {
      toast.error('This item is not available for the selected date')
      return
    }
    addItem({
      id,
      name,
      price: cost,
      maxQuantity: available,
      picture,
    })
    toast.success(`${name} added to cart`)
  }

  return (
    <div className="category-card bg-white">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {picture ? (
          <Image src={picture} alt={name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-3xl">📦</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-dark text-sm mb-1">{name}</h3>
        <p className="text-secondary font-bold text-lg mb-1">{formatCurrency(cost)}<span className="text-xs text-body font-normal">/day</span></p>
        <p className="text-xs text-body mb-3">
          {available > 0 ? `${available} available` : 'Not available'}
        </p>
        <button
          onClick={handleAdd}
          disabled={available <= 0}
          className="btn-primary w-full text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
