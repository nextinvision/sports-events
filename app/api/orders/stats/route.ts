import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import type { Order, OrderItem, Ticket } from '@/types/prisma'

type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    ticket: Ticket
  })[]
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
        orderItems: {
          include: {
            ticket: true,
          },
        },
      },
    })

    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum: number, order: OrderWithItems) => sum + order.totalAmount, 0)
    
    const now = new Date()
    const upcomingEvents = orders.filter((order: OrderWithItems) => {
      return order.orderItems.some((item) => {
        return new Date(item.ticket.date) > now
      })
    }).length

    const activeTickets = orders.reduce((sum: number, order: OrderWithItems) => {
      return sum + order.orderItems.reduce((itemSum: number, item) => {
        return itemSum + item.quantity
      }, 0)
    }, 0)

    return NextResponse.json({
      totalOrders,
      totalSpent,
      upcomingEvents,
      activeTickets,
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

