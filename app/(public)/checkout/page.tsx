'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCart } from '@/components/public/CartContext'
import { formatCurrency } from '@/lib/utils'

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventAddress: string
  eventCity: string
  eventZip: string
  deliveryType: string
  notes: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, eventDate } = useCart()
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>()
  const [loading, setLoading] = useState(false)

  if (!items.length || !eventDate) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-body mb-4">Your cart is empty or no event date selected.</p>
        <a href="/order-by-date" className="btn-primary inline-block">Start Booking</a>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true)
    try {
      sessionStorage.setItem('checkout_data', JSON.stringify(data))
      router.push('/checkout/payment')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-dark mb-8">Checkout</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h2 className="font-bold text-dark mb-2">Order Summary</h2>
        <p className="text-body text-sm mb-2">Event Date: {eventDate}</p>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-body py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-dark mt-2 border-t pt-2">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">First Name *</label>
            <input {...register('firstName', { required: true })} className="w-full border rounded px-3 py-2" />
            {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Last Name *</label>
            <input {...register('lastName', { required: true })} className="w-full border rounded px-3 py-2" />
            {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Email *</label>
          <input type="email" {...register('email', { required: true })} className="w-full border rounded px-3 py-2" />
          {errors.email && <span className="text-red-500 text-xs">Required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Phone</label>
          <input type="tel" {...register('phone')} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Event Address *</label>
          <input {...register('eventAddress', { required: true })} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">City *</label>
            <input {...register('eventCity', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Zip *</label>
            <input {...register('eventZip', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Delivery or Pickup</label>
          <select {...register('deliveryType')} className="w-full border rounded px-3 py-2">
            <option value="delivery">Delivery</option>
            <option value="pickup">Customer Pickup</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Notes</label>
          <textarea {...register('notes')} rows={3} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </form>
    </div>
  )
}
