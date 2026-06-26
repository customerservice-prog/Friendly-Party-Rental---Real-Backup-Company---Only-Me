'use client'

import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react'
import Link from 'next/link'

export interface CalendarOrder {
  id: string
  orderNumber: string
  status: string
  deliveryType: string
  customerName: string
  eventDate: string
  eventEndDate?: string | null
}

interface OrderCalendarProps {
  orders: CalendarOrder[]
  closedDates?: string[]
  currentMonth?: Date
  onMonthChange?: (date: Date) => void
  onDateClick?: (date: Date) => void
  filter?: string
  onFilterChange?: (filter: string) => void
  compact?: boolean
}

const FILTERS = [
  'Active',
  'Active-Deliver',
  'Active-Customer Pickup',
  'Incomplete',
  'Sent Quotes',
  'Canceled',
  'Orders Created',
]

function getOrderBadge(order: CalendarOrder) {
  if (order.status === 'canceled') return null
  if (order.status === 'incomplete' || order.status === 'quote') {
    return <span className="admin-badge-pickup" title="Pickup/Quote" />
  }
  if (order.eventEndDate) {
    return <span className="admin-badge-multiday" title="Multiday" />
  }
  if (order.deliveryType === 'pickup') {
    return <span className="admin-badge-pickup" title="Customer Pickup" />
  }
  return <span className="admin-badge-active" title="Active Delivery" />
}

export default function OrderCalendar({
  orders,
  closedDates = [],
  currentMonth: initialMonth,
  onMonthChange,
  onDateClick,
  filter = 'Active',
  onFilterChange,
  compact = false,
}: OrderCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPadding = monthStart.getDay()

  const changeMonth = (date: Date) => {
    setCurrentMonth(date)
    onMonthChange?.(date)
  }

  const ordersByDay = days.map((day) => {
    const dayStr = format(day, 'yyyy-MM-dd')
    const dayOrders = orders.filter((o) => {
      if (!o.eventDate) return false
      return format(new Date(o.eventDate), 'yyyy-MM-dd') === dayStr
    })
    return { day, orders: dayOrders }
  })

  const isClosed = (date: Date) => closedDates.includes(format(date, 'yyyy-MM-dd'))

  return (
    <div className={compact ? '' : 'bg-white rounded shadow'}>
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <button onClick={() => changeMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) => changeMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
            className="border rounded px-2 py-1 text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{format(new Date(2026, i, 1), 'MMMM')}</option>
            ))}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={(e) => changeMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button onClick={() => changeMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
          <ChevronRight size={18} />
        </button>
      </div>

      {onFilterChange && (
        <div className="p-2 border-b">
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} className="min-h-[80px] border border-gray-100 bg-gray-50" />
        ))}
        {ordersByDay.map(({ day, orders: dayOrders }) => {
          const closed = isClosed(day)
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[80px] border border-gray-100 p-1 cursor-pointer hover:bg-blue-50 transition-colors
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-50' : ''}
                ${closed ? 'bg-red-50' : ''}
              `}
              onClick={() => onDateClick?.(day)}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">{format(day, 'd')}</span>
                {closed && <span className="text-[10px] text-red-500 font-bold">closed</span>}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {dayOrders.slice(0, compact ? 3 : 5).map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center gap-0.5"
                    title={`${order.orderNumber} - ${order.customerName}`}
                  >
                    {getOrderBadge(order)}
                  </Link>
                ))}
                {dayOrders.length > (compact ? 3 : 5) && (
                  <span className="text-[10px] text-gray-400">+{dayOrders.length - (compact ? 3 : 5)}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-2 border-t text-xs text-gray-500 flex flex-wrap gap-3">
        <span className="flex items-center gap-1"><span className="admin-badge-active" /> Active (delivery)</span>
        <span className="flex items-center gap-1"><span className="admin-badge-pickup" /> Active (pickup) / Incomplete</span>
        <span className="flex items-center gap-1"><span className="admin-badge-multiday" /> Multiday</span>
        <span className="flex items-center gap-1"><Sun size={12} className="text-yellow-500" /> Holiday</span>
      </div>
    </div>
  )
}
