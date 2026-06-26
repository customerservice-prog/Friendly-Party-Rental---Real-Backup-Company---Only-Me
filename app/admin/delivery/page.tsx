'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function DeliveryPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [orders, setOrders] = useState<Array<{
    id: string
    orderNumber: string
    deliveryType: string
    eventAddress?: string
    customer: { firstName: string; lastName: string; phone?: string }
  }>>([])

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((d) => {
        const filtered = (d.orders || []).filter(
          (o: { eventDate: string }) => o.eventDate.startsWith(date)
        )
        setOrders(filtered)
      })
  }, [date])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Delivery Schedule</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2 text-sm mb-6"
      />

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{o.orderNumber} — {o.customer.firstName} {o.customer.lastName}</p>
              <p className="text-sm text-body">{o.deliveryType} · {o.eventAddress}</p>
              <p className="text-sm text-body">{o.customer.phone}</p>
            </div>
            <Link href={`/admin/orders/${o.id}`} className="text-secondary text-sm hover:underline">View</Link>
          </div>
        ))}
        {orders.length === 0 && <p className="text-gray-400">No deliveries for this date</p>}
      </div>
    </div>
  )
}
