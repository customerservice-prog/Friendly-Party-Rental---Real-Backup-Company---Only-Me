'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function ConfirmationPage() {
  const [order, setOrder] = useState<{
    orderNumber: string
    depositAmount: number
    balanceDue: number
    totalAmount: number
  } | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('order_confirmation')
    if (data) {
      setOrder(JSON.parse(data))
      sessionStorage.removeItem('order_confirmation')
    }
  }, [])

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-body">No order found.</p>
        <Link href="/" className="btn-primary inline-block mt-4">Return Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-dark mb-4">Thank You!</h1>
      <p className="text-body mb-6">
        Your order has been confirmed. A confirmation email has been sent to your email address.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left space-y-2">
        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Total:</strong> {formatCurrency(order.totalAmount)}</p>
        <p><strong>Deposit Paid:</strong> {formatCurrency(order.depositAmount)}</p>
        <p><strong>Balance Due:</strong> {formatCurrency(order.balanceDue)}</p>
      </div>

      <p className="text-body text-sm mb-8">
        Questions? Call us at <a href="tel:315-884-1498" className="text-secondary">315-884-1498</a>
        or email <a href="mailto:customerservice@friendlypartyrental.com" className="text-secondary">customerservice@friendlypartyrental.com</a>
      </p>

      <Link href="/" className="btn-primary inline-block">Return Home</Link>
    </div>
  )
}
