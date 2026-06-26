export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const search = request.nextUrl.searchParams.get('search')
  const customers = await prisma.customer.findMany({
    where: search ? {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    } : undefined,
    include: {
      orders: { select: { id: true, totalAmount: true, createdAt: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const result = customers.map((c) => ({
    ...c,
    orderCount: c.orders.length,
    totalSpent: c.orders.reduce((sum, o) => sum + o.totalAmount, 0),
    lastOrderDate: c.orders.length > 0
      ? c.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt
      : null,
  }))

  return NextResponse.json({ customers: result })
}
