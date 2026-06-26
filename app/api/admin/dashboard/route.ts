export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date()
  const dayStart = startOfDay(today)
  const dayEnd = endOfDay(today)

  const collectedToday = await prisma.payment.aggregate({
    where: { createdAt: { gte: dayStart, lte: dayEnd } },
    _sum: { amount: true },
  })

  const inventoryCount = await prisma.item.count({
    where: { cost: { gte: 65 }, displayToCustomer: true },
  })

  const upcomingOrders = await prisma.order.findMany({
    where: {
      eventDate: { gte: dayStart },
      status: { notIn: ['canceled'] },
    },
    include: {
      customer: true,
      items: true,
    },
    orderBy: { eventDate: 'asc' },
    take: 50,
  })

  const calendarOrders = upcomingOrders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    status: o.status,
    deliveryType: o.deliveryType,
    customerName: `${o.customer.firstName} ${o.customer.lastName}`,
    eventDate: o.eventDate.toISOString(),
    eventEndDate: o.eventEndDate?.toISOString() || null,
  }))

  const closedDates = await prisma.closedDate.findMany()
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })

  return NextResponse.json({
    collectedToday: collectedToday._sum.amount || 0,
    inventoryCount,
    calendarOrders,
    closedDates: closedDates.map((d) => d.date.toISOString()),
    tasks,
  })
}
