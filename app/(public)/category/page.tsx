'use client'

import { useState } from 'react'
import CategoryCard from '@/components/public/CategoryCard'
import { PUBLIC_CATEGORIES } from '@/lib/utils'

export default function CategoryPage() {
  const [search, setSearch] = useState('')

  const filtered = PUBLIC_CATEGORIES.filter(
    (c) => c.slug !== 'order-by-date' && c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark">Browse All Rentals</h1>
        <input
          type="search"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 text-sm w-64"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((cat) => (
          <CategoryCard key={cat.slug} name={cat.name} href={cat.href} image={cat.image} />
        ))}
      </div>
    </div>
  )
}
