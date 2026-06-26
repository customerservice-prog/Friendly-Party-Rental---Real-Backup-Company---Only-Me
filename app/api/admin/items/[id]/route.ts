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

  const item = await prisma.item.findUnique({
    where: { id: params.id },
    include: { category: true },
  })

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ item })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const item = await prisma.item.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      type: body.type,
      cost: body.cost ? parseFloat(body.cost) : undefined,
      quantity: body.quantity ? parseInt(body.quantity) : undefined,
      picture: body.picture,
      displayToCustomer: body.displayToCustomer,
      scheduleProfile: body.scheduleProfile,
      categoryId: body.categoryId,
    },
    include: { category: true },
  })

  return NextResponse.json({ item })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.item.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
