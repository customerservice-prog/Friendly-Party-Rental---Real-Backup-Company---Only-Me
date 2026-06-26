import { prisma } from './prisma'
import { startOfDay, endOfDay } from 'date-fns'

export async function getItemAvailability(itemId: string, date: Date): Promise<number> {
  const item = await prisma.item.findUnique({ where: { id: itemId } })
  if (!item) return 0

  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)

  const closedDate = await prisma.closedDate.findFirst({
    where: {
      date: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
  })
  if (closedDate) return 0

  const orders = await prisma.order.findMany({
    where: {
      eventDate: {
        gte: dayStart,
        lte: dayEnd,
      },
      status: { notIn: ['canceled', 'quote'] },
    },
    include: {
      items: {
        where: { itemId },
      },
    },
  })

  let booked = 0
  for (const order of orders) {
    for (const orderItem of order.items) {
      booked += orderItem.quantity
    }
  }

  return Math.max(0, item.quantity - booked)
}

export async function getItemsWithAvailability(
  date: Date,
  categorySlug?: string,
  search?: string
) {
  const where: Record<string, unknown> = {
    displayToCustomer: true,
  }

  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  if (search) {
    where.name = { contains: search, mode: 'insensitive' }
  }

  const items = await prisma.item.findMany({
    where,
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  const availabilityMap = new Map<string, number>()
  for (const item of items) {
    const available = await getItemAvailability(item.id, date)
    availabilityMap.set(item.id, available)
  }

  return items.map((item) => ({
    ...item,
    available: availabilityMap.get(item.id) || 0,
  }))
}

export async function isDateClosed(date: Date): Promise<boolean> {
  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)
  const closed = await prisma.closedDate.findFirst({
    where: {
      date: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
  })
  return !!closed
}
