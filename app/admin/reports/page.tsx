'use client'

import { useEffect, useState } from 'react'
import RevenueChart from '@/components/admin/RevenueChart'
import BestSellersChart from '@/components/admin/BestSellersChart'

export default function ReportsPage() {
  const [revenue, setRevenue] = useState<Array<{ month: string; revenue: number }>>([])
  const [bestSellers, setBestSellers] = useState<Array<{ name: string; count: number }>>([])

  useEffect(() => {
    fetch('/api/admin/reports/monthly-revenue')
      .then((r) => r.json())
      .then((d) => setRevenue(d.data || []))
    fetch('/api/admin/reports/best-sellers')
      .then((r) => r.json())
      .then((d) => setBestSellers(d.data || []))
  }, [])

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold text-dark">Reports</h1>

      <div className="bg-white rounded shadow p-6">
        <h2 className="font-bold text-dark mb-4">Payments Received (Last 19 Months)</h2>
        <RevenueChart data={revenue} />
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="font-bold text-dark mb-4">Best Sellers (Last 60 Days)</h2>
        <BestSellersChart data={bestSellers} />
      </div>
    </div>
  )
}
