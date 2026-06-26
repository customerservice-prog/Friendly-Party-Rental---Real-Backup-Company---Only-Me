export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { displayToCustomer: true },
    orderBy: { sortOrder: 'asc' },
  })
  return NextResponse.json({ categories })
}
