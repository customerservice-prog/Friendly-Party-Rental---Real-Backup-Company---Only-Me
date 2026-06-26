export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getItemsWithAvailability } from '@/lib/availability'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const date = searchParams.get('date')
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  if (!date) {
    const { prisma } = await import('@/lib/prisma')
    const items = await prisma.item.findMany({
      where: {
        displayToCustomer: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
      },
      include: { category: true },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ items })
  }

  const items = await getItemsWithAvailability(
    new Date(date),
    category || undefined,
    search || undefined
  )

  const availableItems = items.filter((i) => i.available > 0)

  return NextResponse.json({ items: availableItems })
}
