'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useCart } from '@/components/public/CartContext'
import { formatCurrency } from '@/lib/utils'

export default function PaymentPage() {
  const router = useRouter()
  const { items, subtotal, eventDate, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [depositAmount, setDepositAmount] = useState(0)

  useEffect(() => {
  const checkoutData = sessionStorage.getItem('checkout_data')
    if (!checkoutData || !items.length || !eventDate) {
      router.push('/checkout')
      return
    }
    fetch('/api/deposit-rule')
      .then((r) => r.json())
      .then((data) => {
        const rule = data.rule
        if (rule?.type === 'percentage') {
          setDepositAmount(subtotal * (rule.amount / 100))
        } else {
          setDepositAmount(rule?.amount || subtotal * 0.25)
        }
      })
      .catch(() => setDepositAmount(subtotal * 0.25))
  }, [items, eventDate, subtotal, router])

  const handlePayment = async () => {
    const checkoutData = JSON.parse(sessionStorage.getItem('checkout_data') || '{}')
    setLoading(true)

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutData,
          eventDate,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            unitPrice: i.price,
          })),
          subtotal,
          depositAmount,
        }),
      })

      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || 'Order failed')

      const paymentRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.order.id,
          amount: depositAmount,
        }),
      })

      const paymentData = await paymentRes.json()
      if (!paymentRes.ok) throw new Error(paymentData.error || 'Payment failed')

      sessionStorage.setItem('order_confirmation', JSON.stringify({
        orderNumber: orderData.order.orderNumber,
        depositAmount,
        balanceDue: subtotal - depositAmount,
        totalAmount: subtotal,
      }))
      clearCart()
      sessionStorage.removeItem('checkout_data')
      router.push('/checkout/confirmation')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-dark mb-8">Payment</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8 space-y-3">
        <div className="flex justify-between text-body">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between font-bold text-dark text-lg border-t pt-3">
          <span>Deposit Due Today</span>
          <span className="text-secondary">{formatCurrency(depositAmount)}</span>
        </div>
        <div className="flex justify-between text-body text-sm">
          <span>Balance due before delivery</span>
          <span>{formatCurrency(subtotal - depositAmount)}</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-body">
        <p>Payment is processed securely through Stripe. Configure your Stripe keys in environment variables to enable live payments.</p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn-primary w-full text-lg py-3"
      >
        {loading ? 'Processing...' : `Pay Deposit ${formatCurrency(depositAmount)}`}
      </button>
    </div>
  )
}
