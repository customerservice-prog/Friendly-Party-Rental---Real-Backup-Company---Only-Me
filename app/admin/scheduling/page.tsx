'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import OrderCalendar from '@/components/admin/OrderCalendar'
import { format } from 'date-fns'

export default function SchedulingPage() {
  const [orders, setOrders] = useState<Array<{
    id: string
    orderNumber: string
    status: string
    deliveryType: string
    customerName: string
    eventDate: string
    eventEndDate?: string | null
  }>>([])
  const [closedDates, setClosedDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.calendarOrders || [])
        setClosedDates((d.closedDates || []).map((dt: string) => format(new Date(dt), 'yyyy-MM-dd')))
      })
  }, [])

  const dayOrders = selectedDate
    ? orders.filter((o) => format(new Date(o.eventDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : []

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dark">Scheduling</h1>
        <Link href="/admin/orders/new" className="btn-admin">+ BOOK</Link>
      </div>

      <OrderCalendar
        orders={orders}
        closedDates={closedDates}
        onDateClick={setSelectedDate}
      />

      {selectedDate && (
        <div className="mt-6 bg-white rounded shadow p-4">
          <h2 className="font-bold text-dark mb-4">
            Orders for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          {dayOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders for this date</p>
          ) : (
            <ul className="space-y-2">
              {dayOrders.map((o) => (
                <li key={o.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <span className="font-medium">{o.orderNumber}</span>
                    <span className="text-body text-sm ml-2">{o.customerName}</span>
                  </div>
                  <Link href={`/admin/orders/${o.id}`} className="text-secondary text-sm hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
