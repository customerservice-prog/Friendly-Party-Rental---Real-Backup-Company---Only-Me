export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      items: true,
      payments: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ order })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      status: body.status,
      internalNotes: body.internalNotes,
      eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
      eventAddress: body.eventAddress,
      eventCity: body.eventCity,
      eventZip: body.eventZip,
      deliveryType: body.deliveryType,
      balanceDue: body.balanceDue,
      amountPaid: body.amountPaid,
    },
    include: { customer: true, items: true, payments: true },
  })

  return NextResponse.json({ order })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.order.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
