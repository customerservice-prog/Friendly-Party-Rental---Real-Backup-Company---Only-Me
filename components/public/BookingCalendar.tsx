'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
} from 'date-fns'

interface BookingCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  closedDates?: string[]
}

export default function BookingCalendar({
  selectedDate,
  onSelectDate,
  closedDates = [],
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = startOfDay(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startPadding = monthStart.getDay()
  const paddingDays = Array.from({ length: startPadding }, (_, i) => i)

  const isClosed = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return closedDates.includes(dateStr)
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(currentMonth.getFullYear(), i, 1)
    return { value: i, label: format(d, 'MMMM') }
  })

  const years = Array.from({ length: 3 }, (_, i) => currentMonth.getFullYear() + i)

  return (
    <div className="bg-white rounded-lg shadow border border-primary/50 p-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))
            }
            className="border rounded px-2 py-1 text-sm"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={(e) =>
              setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1))
            }
            className="border rounded px-2 py-1 text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-body mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {paddingDays.map((i) => (
          <div key={`pad-${i}`} className="h-10" />
        ))}
        {days.map((day) => {
          const disabled = isBefore(day, today) || isClosed(day)
          const selected = selectedDate && isSameDay(day, selectedDate)
          const closed = isClosed(day)

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onSelectDate(day)}
              disabled={disabled}
              className={`h-10 rounded text-sm font-medium transition-colors
                ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : ''}
                ${selected ? 'bg-secondary text-white' : ''}
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary/30'}
                ${closed && !isBefore(day, today) ? 'bg-red-100 text-red-400' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
