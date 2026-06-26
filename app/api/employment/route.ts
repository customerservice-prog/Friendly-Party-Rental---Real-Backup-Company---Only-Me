export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, position, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.employmentApplication.create({
      data: {
        name,
        phone: phone || null,
        email,
        position: position || null,
        message: message || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Employment application error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
