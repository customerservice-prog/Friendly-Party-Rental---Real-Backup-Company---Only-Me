'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Category {
  id: string
  name: string
}

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'Regular',
    cost: '',
    quantity: '',
    categoryId: '',
    displayToCustomer: true,
  })

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))

    fetch(`/api/admin/items/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        const item = d.item
        setForm({
          name: item.name,
          description: item.description || '',
          type: item.type,
          cost: String(item.cost),
          quantity: String(item.quantity),
          categoryId: item.categoryId,
          displayToCustomer: item.displayToCustomer,
        })
      })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/admin/items/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success('Item updated')
      router.push('/admin/items')
    } else toast.error('Failed to update')
  }

  return (
    <div className="p-4 max-w-2xl">
      <h1 className="text-xl font-bold text-dark mb-6">Edit Item</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cost</label>
            <input type="number" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full border rounded px-3 py-2" required>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.displayToCustomer} onChange={(e) => setForm({ ...form, displayToCustomer: e.target.checked })} />
          <span className="text-sm">Display to Customer</span>
        </label>
        <button type="submit" className="btn-admin">Save Changes</button>
      </form>
    </div>
  )
}
