'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Array<{
    id: string
    name: string
    slug: string
    displayToCustomer: boolean
    description?: string
    items: Array<{ id: string }>
  }>>([])

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Categories</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-admin-green text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-center">Display</th>
              <th className="px-4 py-3 text-right">Items</th>
              <th className="px-4 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-body">{cat.slug}</td>
                <td className="px-4 py-3 text-center">{cat.displayToCustomer ? '✓' : '✗'}</td>
                <td className="px-4 py-3 text-right">{cat.items.length}</td>
                <td className="px-4 py-3 text-body text-xs max-w-xs truncate">{cat.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
