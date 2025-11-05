import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Tickets fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      category,
      price,
      quantity,
      image,
      venue,
      date,
      time,
    } = body

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !venue ||
      !date ||
      !time
    ) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        available: parseInt(quantity),
        image,
        venue,
        date: new Date(date),
        time,
      },
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Ticket creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

