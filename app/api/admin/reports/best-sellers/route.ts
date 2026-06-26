export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { subDays } from 'date-fns'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const since = subDays(new Date(), 60)

  const orderItems = await prisma.orderItem.findMany({
    where: {
      createdAt: { gte: since },
      itemId: { not: null },
    },
    include: { item: { include: { category: true } } },
  })

  const categoryCounts: Record<string, number> = {}
  for (const oi of orderItems) {
    const catName = oi.item?.category?.name || 'Other'
    categoryCounts[catName] = (categoryCounts[catName] || 0) + oi.quantity
  }

  const data = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return NextResponse.json({ data })
}
