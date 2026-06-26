import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured. Would send:', { to, subject })
    return { success: true, simulated: true }
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Friendly Party Rental <customerservice@friendlypartyrental.com>',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export function orderConfirmationEmail(order: {
  orderNumber: string
  customerName: string
  eventDate: string
  totalAmount: number
  depositAmount: number
  balanceDue: number
  items: Array<{ name: string; quantity: number; total: number }>
}) {
  const itemsHtml = order.items
    .map((i) => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>$${i.total.toFixed(2)}</td></tr>`)
    .join('')

  return {
    subject: `Order Confirmation #${order.orderNumber} - Friendly Party Rental`,
    html: `
      <div style="font-family: Roboto, sans-serif; max-width: 600px;">
        <h2 style="color: #1A6FD4;">Thank You for Your Order!</h2>
        <p>Dear ${order.customerName},</p>
        <p>Your party rental order has been confirmed. Here are the details:</p>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Event Date:</strong> ${order.eventDate}</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
          <tr><th>Item</th><th>Qty</th><th>Total</th></tr>
          ${itemsHtml}
        </table>
        <p><strong>Total:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Deposit Paid:</strong> $${order.depositAmount.toFixed(2)}</p>
        <p><strong>Balance Due:</strong> $${order.balanceDue.toFixed(2)}</p>
        <p>Questions? Call us at 315-884-1498 or email customerservice@friendlypartyrental.com</p>
        <p>Thank you for choosing Friendly Party Rental!</p>
      </div>
    `,
  }
}

export function contactFormEmail(data: {
  name: string
  email: string
  phone?: string
  eventDate?: string
  message: string
}) {
  return {
    subject: `Contact Form: ${data.name} - Friendly Party Rental`,
    html: `
      <div style="font-family: Roboto, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Event Date:</strong> ${data.eventDate || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      </div>
    `,
  }
}
