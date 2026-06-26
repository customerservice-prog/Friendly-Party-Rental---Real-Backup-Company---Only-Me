'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface Item {
  id: string
  name: string
  type: string
  cost: number
  quantity: number
  displayToCustomer: boolean
  category: { name: string }
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const perPage = 100

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    fetch(`/api/admin/items?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items || [])
        setTotal(d.total || 0)
      })
      .catch(() => {})
  }, [page, search])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dark">Items</h1>
        <Link href="/admin/items/new" className="btn-admin">Add New</Link>
      </div>

      <div className="flex gap-2 mb-4 border-b pb-2">
        <button className="text-sm font-medium text-admin-green border-b-2 border-admin-green pb-1">Browse Mode</button>
        <button className="text-sm text-gray-400 pb-1">Spreadsheet Mode</button>
        <button className="text-sm text-gray-400 pb-1">Import & Export Mode</button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="search"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 text-sm flex-1"
        />
        <span className="text-sm text-gray-500 self-center">
          {(page - 1) * perPage + 1}-{Math.min(page * perPage, total)} of {total} records
        </span>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-admin-green text-white">
            <tr>
              <th className="px-3 py-2 w-8"></th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-right">Cost</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-center">Display</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-300">⠿</td>
                <td className="px-3 py-2 font-medium">{item.name}</td>
                <td className="px-3 py-2">{item.type}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(item.cost)}</td>
                <td className="px-3 py-2 text-right">{item.quantity}</td>
                <td className="px-3 py-2">{item.category.name}</td>
                <td className="px-3 py-2 text-center">{item.displayToCustomer ? '✓' : '✗'}</td>
                <td className="px-3 py-2 text-center">
                  <Link href={`/admin/items/${item.id}`} className="text-admin-gold hover:underline text-xs mr-2">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
