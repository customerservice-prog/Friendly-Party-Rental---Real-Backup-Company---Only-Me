export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orderId, amount, method, notes } = await request.json()

  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount: parseFloat(amount),
      method: method || 'card',
      notes,
    },
  })

  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (order) {
    const newAmountPaid = order.amountPaid + parseFloat(amount)
    const newBalance = order.totalAmount - newAmountPaid
    await prisma.order.update({
      where: { id: orderId },
      data: { amountPaid: newAmountPaid, balanceDue: newBalance },
    })
  }

  return NextResponse.json({ payment })
}
