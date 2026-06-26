export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: 'asc' },
  })
  return NextResponse.json({ images })
}
