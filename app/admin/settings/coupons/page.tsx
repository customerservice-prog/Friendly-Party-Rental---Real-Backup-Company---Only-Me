'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Coupon {
  id: string
  code: string
  discountType: string
  discountAmount: number
  expiresAt?: string
  isActive: boolean
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [form, setForm] = useState({
    code: '',
    discountType: 'percentage',
    discountAmount: '',
    expiresAt: '',
    isActive: true,
  })

  useEffect(() => {
    fetch('/api/admin/coupons')
      .then((r) => r.json())
      .then((d) => setCoupons(d.coupons || []))
  }, [])

  const handleAdd = async () => {
    const res = await fetch('/api/admin/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const d = await res.json()
      setCoupons([d.coupon, ...coupons])
      toast.success('Coupon created')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Coupons</h1>
      <div className="bg-white rounded shadow p-4 mb-6 grid grid-cols-2 gap-3">
        <input placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="border rounded px-3 py-2 text-sm" />
        <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="border rounded px-3 py-2 text-sm">
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed ($)</option>
        </select>
        <input placeholder="Amount" type="number" value={form.discountAmount} onChange={(e) => setForm({ ...form, discountAmount: e.target.value })} className="border rounded px-3 py-2 text-sm" />
        <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className="border rounded px-3 py-2 text-sm" />
        <button onClick={handleAdd} className="btn-admin col-span-2">Add Coupon</button>
      </div>
      <div className="bg-white rounded shadow">
        {coupons.map((c) => (
          <div key={c.id} className="flex justify-between items-center border-b px-4 py-3 text-sm">
            <span className="font-medium">{c.code}</span>
            <span>{c.discountType === 'percentage' ? `${c.discountAmount}%` : `$${c.discountAmount}`}</span>
            <span className={c.isActive ? 'text-green-600' : 'text-gray-400'}>{c.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
