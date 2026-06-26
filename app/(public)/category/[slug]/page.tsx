'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ItemCard from '@/components/public/ItemCard'
import BookingCalendar from '@/components/public/BookingCalendar'
import CartDrawer from '@/components/public/CartDrawer'
import { useCart } from '@/components/public/CartContext'
import { formatDateShort } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

function CategoryContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams()
  const dateParam = searchParams.get('date')
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dateParam ? new Date(dateParam) : null
  )
  const [category, setCategory] = useState<{ name: string; description?: string } | null>(null)
  const [items, setItems] = useState<Array<{
    id: string
    name: string
    cost: number
    picture?: string | null
    available: number
  }>>([])
  const [cartOpen, setCartOpen] = useState(false)
  const { setEventDate, itemCount } = useCart()

  useEffect(() => {
    fetch(`/api/categories/${slug}`)
      .then((r) => r.json())
      .then((data) => setCategory(data.category))
      .catch(() => {})
  }, [slug])

  useEffect(() => {
    if (!selectedDate) return
    const dateStr = formatDateShort(selectedDate)
    setEventDate(dateStr)
    fetch(`/api/items?date=${dateStr}&category=${slug}`)
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
  }, [selectedDate, slug, setEventDate])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">{category?.name || slug}</h1>
          {category?.description && <p className="text-body text-sm mt-1">{category.description}</p>}
        </div>
        <button onClick={() => setCartOpen(true)} className="btn-primary flex items-center gap-2">
          <ShoppingCart size={20} />
          Cart ({itemCount})
        </button>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-dark mb-4">Select Event Date</h2>
        <BookingCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      {selectedDate && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.length === 0 ? (
            <p className="text-body col-span-full text-center py-8">No items available for this date.</p>
          ) : (
            items.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                cost={item.cost}
                picture={item.picture}
                available={item.available}
              />
            ))
          )}
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<p className="text-center py-12">Loading...</p>}>
      <CategoryContent slug={params.slug} />
    </Suspense>
  )
}
