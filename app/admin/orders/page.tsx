'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Order {
  id: string
  orderNumber: string
  status: string
  eventDate: string
  totalAmount: number
  amountPaid: number
  balanceDue: number
  customer: { firstName: string; lastName: string }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (search) params.set('search', search)
    fetch(`/api/admin/orders?${params}`)
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => {})
  }, [statusFilter, search])

  const statusColor = (status: string) => {
    if (status === 'active') return 'bg-green-100 text-green-800'
    if (status === 'incomplete' || status === 'quote') return 'bg-red-100 text-red-800'
    if (status === 'canceled') return 'bg-gray-100 text-gray-600'
    return 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dark">Orders</h1>
        <Link href="/admin/orders/new" className="btn-admin">+ New Order</Link>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="incomplete">Incomplete</option>
          <option value="quote">Quote</option>
          <option value="canceled">Canceled</option>
        </select>
        <input
          type="search"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 text-sm flex-1"
        />
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-admin-green text-white">
            <tr>
              <th className="px-4 py-3 text-left">Order#</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Event Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right">Balance</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                <td className="px-4 py-3">{order.customer.firstName} {order.customer.lastName}</td>
                <td className="px-4 py-3">{formatDate(order.eventDate)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">{formatCurrency(order.totalAmount)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(order.amountPaid)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(order.balanceDue)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-secondary hover:underline text-xs">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
