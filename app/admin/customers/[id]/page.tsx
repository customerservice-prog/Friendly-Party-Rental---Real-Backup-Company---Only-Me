'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<{
    firstName: string
    lastName: string
    email: string
    phone?: string
    address?: string
    city?: string
    zip?: string
    orders: Array<{
      id: string
      orderNumber: string
      eventDate: string
      status: string
      totalAmount: number
    }>
  } | null>(null)

  useEffect(() => {
    fetch(`/api/admin/customers/${params.id}`)
      .then((r) => r.json())
      .then((d) => setCustomer(d.customer))
  }, [params.id])

  if (!customer) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-4xl">
      <Link href="/admin/customers" className="text-secondary text-sm hover:underline mb-4 block">← Back</Link>
      <h1 className="text-xl font-bold text-dark mb-6">{customer.firstName} {customer.lastName}</h1>

      <div className="bg-white rounded shadow p-4 mb-6">
        <p className="text-sm">{customer.email}</p>
        <p className="text-sm">{customer.phone}</p>
        <p className="text-sm">{customer.address}, {customer.city} {customer.zip}</p>
      </div>

      <h2 className="font-bold text-dark mb-4">Orders</h2>
      <div className="bg-white rounded shadow">
        {customer.orders.map((o) => (
          <div key={o.id} className="flex justify-between items-center border-b px-4 py-3">
            <div>
              <Link href={`/admin/orders/${o.id}`} className="text-secondary hover:underline font-medium">
                {o.orderNumber}
              </Link>
              <span className="text-sm text-body ml-2">{formatDate(o.eventDate)}</span>
            </div>
            <span className="font-medium">{formatCurrency(o.totalAmount)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
