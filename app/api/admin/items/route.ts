export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
  const search = request.nextUrl.searchParams.get('search')
  const perPage = 100

  const where = search ? {
    name: { contains: search, mode: 'insensitive' as const },
  } : {}

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      include: { category: true },
      orderBy: { name: 'asc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.item.count({ where }),
  ])

  return NextResponse.json({ items, total, page, perPage })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { slugify } = await import('@/lib/utils')

  const item = await prisma.item.create({
    data: {
      name: body.name,
      slug: body.slug || slugify(body.name),
      description: body.description,
      type: body.type || 'Regular',
      cost: parseFloat(body.cost),
      quantity: parseInt(body.quantity) || 1,
      picture: body.picture,
      displayToCustomer: body.displayToCustomer ?? true,
      scheduleProfile: body.scheduleProfile,
      categoryId: body.categoryId,
    },
    include: { category: true },
  })

  return NextResponse.json({ item })
}
