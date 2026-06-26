'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  orderCount: number
  totalSpent: number
  lastOrderDate?: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = search ? `?search=${search}` : ''
    fetch(`/api/admin/customers${params}`)
      .then((r) => r.json())
      .then((d) => setCustomers(d.customers || []))
  }, [search])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Customers</h1>
      <input
        type="search"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full max-w-md mb-4"
      />
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-admin-green text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-right"># Orders</th>
              <th className="px-4 py-3 text-right">Total Spent</th>
              <th className="px-4 py-3 text-left">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/customers/${c.id}`} className="text-secondary hover:underline">
                    {c.firstName} {c.lastName}
                  </Link>
                </td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone || '—'}</td>
                <td className="px-4 py-3 text-right">{c.orderCount}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(c.totalSpent)}</td>
                <td className="px-4 py-3">{c.lastOrderDate ? formatDate(c.lastOrderDate) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
