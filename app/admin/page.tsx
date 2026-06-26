'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import OrderCalendar from '@/components/admin/OrderCalendar'
import BestSellersChart from '@/components/admin/BestSellersChart'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

interface DashboardData {
  collectedToday: number
  inventoryCount: number
  calendarOrders: Array<{
    id: string
    orderNumber: string
    status: string
    deliveryType: string
    customerName: string
    eventDate: string
    eventEndDate?: string | null
  }>
  closedDates: string[]
  tasks: Array<{ id: string; title: string; completed: boolean }>
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [bestSellers, setBestSellers] = useState<Array<{ name: string; count: number }>>([])
  const [filter, setFilter] = useState('Active')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})

    fetch('/api/admin/reports/best-sellers')
      .then((r) => r.json())
      .then((d) => setBestSellers(d.data || []))
      .catch(() => {})
  }, [])

  const closedDateStrings = data?.closedDates?.map((d) => format(new Date(d), 'yyyy-MM-dd')) || []

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <OrderCalendar
            orders={data?.calendarOrders || []}
            closedDates={closedDateStrings}
            filter={filter}
            onFilterChange={setFilter}
            compact
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded shadow p-4 border-l-4 border-admin-green">
            <p className="text-sm text-gray-500">Collected Today</p>
            <p className="text-2xl font-bold text-dark">
              {formatCurrency(data?.collectedToday || 0)}
            </p>
          </div>

          <div className="bg-white rounded shadow p-4 border-l-4 border-secondary">
            <p className="text-sm text-gray-500">Inventory Count (items $65+)</p>
            <p className="text-2xl font-bold text-dark">{data?.inventoryCount || 0}</p>
          </div>

          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-secondary font-medium">Your level is: Pro+</p>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-dark text-sm">Tasks</h3>
              <button className="text-xs bg-admin-green text-white px-2 py-1 rounded">Add New Task</button>
            </div>
            <ul className="space-y-2">
              {(data?.tasks || []).map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={task.completed} readOnly className="rounded" />
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
                </li>
              ))}
              {(!data?.tasks || data.tasks.length === 0) && (
                <li className="text-gray-400 text-sm">No tasks yet</li>
              )}
            </ul>
            <input
              type="text"
              placeholder="Add a task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="mt-3 w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-dark text-sm mb-3">Best Sellers (Last 60 Days)</h3>
            <BestSellersChart data={bestSellers} />
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-dark text-sm mb-2">Weather — Minoa, NY</h3>
            <p className="text-sm text-body">72°F · Partly Cloudy</p>
            <p className="text-xs text-gray-400 mt-1">Humidity: 55% · Wind: 8 mph</p>
          </div>

          <div className="bg-white rounded shadow p-4">
            <Link href="/admin/reports" className="text-secondary text-sm hover:underline">
              Month to Date → Go to report
            </Link>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-dark text-sm mb-2">Recent Platform Updates</h3>
            <ul className="text-xs text-body space-y-1">
              <li>• New online booking system launched</li>
              <li>• Gallery management added</li>
              <li>• Improved order calendar view</li>
            </ul>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-dark text-sm mb-2">Control Panel Colors</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2"><span className="admin-badge-active" /> Active (delivery)</div>
              <div className="flex items-center gap-2"><span className="admin-badge-pickup" /> Active (pickup) / Incomplete</div>
              <div className="flex items-center gap-2"><span className="admin-badge-multiday" /> Multiday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
