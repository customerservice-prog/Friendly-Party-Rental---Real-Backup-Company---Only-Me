'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { formatCurrency, formatDate } from '@/lib/utils'

interface OrderDetail {
  id: string
  orderNumber: string
  status: string
  eventDate: string
  eventAddress?: string
  eventCity?: string
  eventZip?: string
  deliveryType: string
  subtotal: number
  totalAmount: number
  amountPaid: number
  balanceDue: number
  notes?: string
  internalNotes?: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
  items: Array<{
    id: string
    itemName: string
    quantity: number
    unitPrice: number
    total: number
  }>
  payments: Array<{
    id: string
    amount: number
    method: string
    createdAt: string
  }>
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [status, setStatus] = useState('')
  const [internalNotes, setInternalNotes] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order)
        setStatus(d.order.status)
        setInternalNotes(d.order.internalNotes || '')
      })
      .catch(() => {})
  }, [params.id])

  const saveOrder = async () => {
    const res = await fetch(`/api/admin/orders/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, internalNotes }),
    })
    if (res.ok) toast.success('Order updated')
    else toast.error('Failed to update')
  }

  const addPayment = async () => {
    if (!paymentAmount) return
    const res = await fetch('/api/admin/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: params.id, amount: paymentAmount }),
    })
    if (res.ok) {
      toast.success('Payment recorded')
      setPaymentAmount('')
      const d = await fetch(`/api/admin/orders/${params.id}`).then((r) => r.json())
      setOrder(d.order)
    } else toast.error('Failed')
  }

  if (!order) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-5xl">
      <Link href="/admin/orders" className="text-secondary text-sm hover:underline mb-4 block">← Back to Orders</Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dark">Order {order.orderNumber}</h1>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="border px-3 py-1 rounded text-sm">Print</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-bold text-dark mb-3">Customer</h2>
          <p className="text-sm">{order.customer.firstName} {order.customer.lastName}</p>
          <p className="text-sm text-body">{order.customer.email}</p>
          <p className="text-sm text-body">{order.customer.phone}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-bold text-dark mb-3">Event Details</h2>
          <p className="text-sm">Date: {formatDate(order.eventDate)}</p>
          <p className="text-sm">{order.eventAddress}</p>
          <p className="text-sm">{order.eventCity}, NY {order.eventZip}</p>
          <p className="text-sm">Delivery: {order.deliveryType}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="font-bold text-dark mb-3">Items</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Item</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.itemName}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="py-2 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td colSpan={3} className="py-2 font-bold">Total</td><td className="py-2 text-right font-bold">{formatCurrency(order.totalAmount)}</td></tr>
            <tr><td colSpan={3} className="py-1">Paid</td><td className="py-1 text-right">{formatCurrency(order.amountPaid)}</td></tr>
            <tr><td colSpan={3} className="py-1 font-bold">Balance Due</td><td className="py-1 text-right font-bold text-red-600">{formatCurrency(order.balanceDue)}</td></tr>
          </tfoot>
        </table>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="font-bold text-dark mb-3">Payment History</h2>
        {order.payments.map((p) => (
          <div key={p.id} className="flex justify-between text-sm py-1 border-b">
            <span>{formatDate(p.createdAt)} — {p.method}</span>
            <span>{formatCurrency(p.amount)}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-3">
          <input
            type="number"
            placeholder="Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
          <button onClick={addPayment} className="btn-admin text-sm">Add Payment</button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2 text-sm">
            <option value="active">Active</option>
            <option value="incomplete">Incomplete</option>
            <option value="quote">Quote</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Internal Notes</label>
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <button onClick={saveOrder} className="btn-admin">Save Changes</button>
      </div>
    </div>
  )
}
