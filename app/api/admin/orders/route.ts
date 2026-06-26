export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = request.nextUrl
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search ? {
        OR: [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { customer: { firstName: { contains: search, mode: 'insensitive' } } },
          { customer: { lastName: { contains: search, mode: 'insensitive' } } },
        ],
      } : {}),
    },
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json({ orders })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { generateOrderNumber } = await import('@/lib/utils')

  const customer = await prisma.customer.create({
    data: body.customer,
  })

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerId: customer.id,
      status: body.status || 'active',
      eventDate: new Date(body.eventDate),
      eventAddress: body.eventAddress,
      eventCity: body.eventCity,
      eventState: body.eventState || 'NY',
      eventZip: body.eventZip,
      deliveryType: body.deliveryType || 'delivery',
      subtotal: body.subtotal,
      totalAmount: body.totalAmount,
      depositAmount: body.depositAmount || 0,
      amountPaid: body.amountPaid || 0,
      balanceDue: body.balanceDue || body.totalAmount,
      notes: body.notes,
      items: {
        create: body.items.map((item: { itemId?: string; itemName: string; quantity: number; unitPrice: number }) => ({
          itemId: item.itemId || null,
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.unitPrice * item.quantity,
        })),
      },
    },
    include: { customer: true, items: true },
  })

  return NextResponse.json({ order })
}
