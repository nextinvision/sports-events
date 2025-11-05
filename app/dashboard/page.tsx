'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { FiFileText, FiDollarSign, FiCalendar, FiPackage } from 'react-icons/fi'
import { formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Order {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: Array<{
    ticket: {
      title: string
      image?: string | null
    }
    quantity: number
    price: number
  }>
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, token } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    upcomingEvents: 0,
    activeTickets: 0,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchOrders()
    fetchStats()
  }, [isAuthenticated, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/orders/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load stats')
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPackage className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-2xl font-bold mt-1">
                  {formatPrice(stats.totalSpent)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold mt-1">{stats.upcomingEvents}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiCalendar className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Tickets</p>
                <p className="text-2xl font-bold mt-1">{stats.activeTickets}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiFileText className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(order.totalAmount)}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.ticket.title} x {item.quantity}
                        </span>
                        <span>{formatPrice(item.quantity * item.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Tickets
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

