export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, formatDate } from '@/lib/utils'
import { sendEmail, orderConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      eventAddress,
      eventCity,
      eventZip,
      deliveryType,
      notes,
      items,
      subtotal,
      depositAmount,
    } = body

    if (!firstName || !lastName || !email || !eventDate || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let customer = await prisma.customer.findFirst({ where: { email } })
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          address: eventAddress || null,
          city: eventCity || null,
          state: 'NY',
          zip: eventZip || null,
        },
      })
    }

    const orderNumber = generateOrderNumber()
    const totalAmount = subtotal
    const balanceDue = totalAmount - depositAmount

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        status: 'active',
        eventDate: new Date(eventDate),
        eventAddress: eventAddress || null,
        eventCity: eventCity || null,
        eventState: 'NY',
        eventZip: eventZip || null,
        deliveryType: deliveryType || 'delivery',
        subtotal,
        totalAmount,
        depositAmount,
        amountPaid: depositAmount,
        balanceDue,
        notes: notes || null,
        items: {
          create: items.map((item: { id: string; name: string; quantity: number; unitPrice: number }) => ({
            itemId: item.id,
            itemName: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.unitPrice * item.quantity,
          })),
        },
        payments: depositAmount > 0 ? {
          create: {
            amount: depositAmount,
            method: 'card',
            notes: 'Deposit payment',
          },
        } : undefined,
      },
      include: { items: true },
    })

    const emailContent = orderConfirmationEmail({
      orderNumber: order.orderNumber,
      customerName: `${firstName} ${lastName}`,
      eventDate: formatDate(new Date(eventDate)),
      totalAmount,
      depositAmount,
      balanceDue,
      items: items.map((i: { name: string; quantity: number; unitPrice: number }) => ({
        name: i.name,
        quantity: i.quantity,
        total: i.unitPrice * i.quantity,
      })),
    })

    await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
    })

    return NextResponse.json({ order: { id: order.id, orderNumber: order.orderNumber } })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
