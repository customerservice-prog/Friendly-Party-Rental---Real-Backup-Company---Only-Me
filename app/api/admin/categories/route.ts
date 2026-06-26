export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const categories = await prisma.category.findMany({
    include: { items: { select: { id: true } } },
    orderBy: { sortOrder: 'asc' },
  })

  return NextResponse.json({ categories })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { slugify } = await import('@/lib/utils')

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug || slugify(body.name),
      description: body.description,
      picture: body.picture,
      displayToCustomer: body.displayToCustomer ?? true,
      scheduleProfile: body.scheduleProfile,
      sortOrder: body.sortOrder || 0,
    },
  })

  return NextResponse.json({ category })
}
