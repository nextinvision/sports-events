import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, formatDate } from '@/lib/utils'
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'

interface TicketCardProps {
  ticket: {
    id: string
    title: string
    description: string
    category: string
    price: number
    available: number
    image?: string | null
    venue: string
    date: Date
    time: string
  }
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link href={`/tickets/${ticket.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {ticket.image && (
          <div className="relative h-48 w-full">
            <Image
              src={ticket.image}
              alt={ticket.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                ticket.category === 'SPORTS'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {ticket.category}
            </span>
            <span className="text-sm text-gray-500">
              {ticket.available} left
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {ticket.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {ticket.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FiCalendar className="mr-2" />
              {formatDate(ticket.date)}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="mr-2" />
              {ticket.time}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiMapPin className="mr-2" />
              {ticket.venue}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-2xl font-bold text-indigo-600">
              {formatPrice(ticket.price)}
            </span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

