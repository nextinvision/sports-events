import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { sendEmail, generateOrderConfirmationEmail } from '@/lib/email'
import type { Order, OrderItem, Ticket, User } from '@/types/prisma'

type OrderWithItemsAndUser = Order & {
  user: User
  orderItems: (OrderItem & {
    ticket: Ticket
  })[]
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const { orderId, amount, paymentMethod } = await request.json()

    if (!orderId || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: {
            ticket: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 })
    }

    if (order.userId !== payload.userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { message: 'Order already processed' },
        { status: 400 }
      )
    }

    // In production, integrate with Stripe here
    // For demo purposes, we'll simulate a successful payment
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod,
        status: 'COMPLETED',
        transactionId,
      },
    })

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'CONFIRMED',
      },
    })

    // Send confirmation email
    const tickets = (order as OrderWithItemsAndUser).orderItems.map((item) => ({
      title: item.ticket.title,
      quantity: item.quantity,
      price: item.price,
    }))

    await sendEmail({
      to: order.user.email,
      subject: 'Order Confirmation - TicketHub',
      html: generateOrderConfirmationEmail(order, tickets),
    })

    return NextResponse.json({
      message: 'Payment successful',
      payment,
    })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

