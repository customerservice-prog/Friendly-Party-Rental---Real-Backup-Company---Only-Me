'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function NewOrderPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventAddress: '',
    eventCity: '',
    eventZip: '',
    deliveryType: 'delivery',
    itemName: '',
    quantity: '1',
    unitPrice: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const subtotal = parseFloat(form.unitPrice) * parseInt(form.quantity)
    const depositAmount = subtotal * 0.25

    const res = await fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        },
        eventDate: form.eventDate,
        eventAddress: form.eventAddress,
        eventCity: form.eventCity,
        eventZip: form.eventZip,
        deliveryType: form.deliveryType,
        subtotal,
        totalAmount: subtotal,
        depositAmount,
        amountPaid: 0,
        balanceDue: subtotal,
        notes: form.notes,
        items: [{
          itemName: form.itemName,
          quantity: parseInt(form.quantity),
          unitPrice: parseFloat(form.unitPrice),
        }],
      }),
    })

    if (res.ok) {
      const d = await res.json()
      toast.success('Order created')
      router.push(`/admin/orders/${d.order.id}`)
    } else toast.error('Failed to create order')
  }

  return (
    <div className="p-4 max-w-2xl">
      <h1 className="text-xl font-bold text-dark mb-6">Create New Order</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="border rounded px-3 py-2" required />
          <input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="border rounded px-3 py-2" required />
        </div>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded px-3 py-2" required />
        <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded px-3 py-2" />
        <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className="w-full border rounded px-3 py-2" required />
        <input placeholder="Event Address" value={form.eventAddress} onChange={(e) => setForm({ ...form, eventAddress: e.target.value })} className="w-full border rounded px-3 py-2" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="City" value={form.eventCity} onChange={(e) => setForm({ ...form, eventCity: e.target.value })} className="border rounded px-3 py-2" />
          <input placeholder="Zip" value={form.eventZip} onChange={(e) => setForm({ ...form, eventZip: e.target.value })} className="border rounded px-3 py-2" />
        </div>
        <select value={form.deliveryType} onChange={(e) => setForm({ ...form, deliveryType: e.target.value })} className="w-full border rounded px-3 py-2">
          <option value="delivery">Delivery</option>
          <option value="pickup">Customer Pickup</option>
        </select>
        <input placeholder="Item Name" value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} className="w-full border rounded px-3 py-2" required />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="border rounded px-3 py-2" required />
          <input type="number" step="0.01" placeholder="Unit Price" value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} className="border rounded px-3 py-2" required />
        </div>
        <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full border rounded px-3 py-2" />
        <button type="submit" className="btn-admin">Create Order</button>
      </form>
    </div>
  )
}
