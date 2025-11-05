'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils'
import { FiDownload, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Order {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: Array<{
    ticket: {
      id: string
      title: string
      description: string
      image?: string | null
      venue: string
      date: string
      time: string
    }
    quantity: number
    price: number
  }>
  payment?: {
    transactionId: string
    status: string
    createdAt: string
  }
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, token } = useAuthStore()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchOrder()
  }, [isAuthenticated, router])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      } else {
        toast.error('Failed to load order')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Failed to load order')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-700 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order Details</h1>
                <p className="text-gray-600">Order #{order.id.slice(-8)}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  order.status === 'COMPLETED' || order.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-semibold">{formatDateTime(order.createdAt)}</p>
              </div>
              {order.payment && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="font-semibold font-mono text-sm">
                    {order.payment.transactionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tickets</h2>
            <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.ticket.image && (
                      <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden">
                        <Image
                          src={item.ticket.image}
                          alt={item.ticket.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.ticket.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{item.ticket.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2" />
                          {formatDate(item.ticket.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiClock className="mr-2" />
                          {item.ticket.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="mr-2" />
                          {item.ticket.venue}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-semibold">{item.quantity} tickets</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-semibold text-lg">
                            {formatPrice(item.quantity * item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Total Amount</h2>
              <p className="text-3xl font-bold text-indigo-600">
                {formatPrice(order.totalAmount)}
              </p>
            </div>
            {(order.status === 'CONFIRMED' || order.status === 'COMPLETED') && (
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center mt-4">
                <FiDownload className="mr-2" />
                Download Tickets
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

