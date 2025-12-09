import { prisma } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { FiCalendar, FiMapPin, FiClock, FiShoppingCart } from 'react-icons/fi'
import TicketPurchase from '@/components/TicketPurchase'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getTicket(id: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })

  if (!ticket) {
    notFound()
  }

  return ticket
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const ticket = await getTicket(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Details */}
          <div>
            {ticket.image && (
              <div className="relative h-96 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src={ticket.image}
                  alt={ticket.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ticket.category === 'SPORTS'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {ticket.category}
                </span>
                <span className="text-sm text-gray-600">
                  {ticket.available} tickets available
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {ticket.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="mr-3 text-indigo-600" size={20} />
                  <span>{formatDate(ticket.date)}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FiClock className="mr-3 text-indigo-600" size={20} />
                  <span>{ticket.time}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FiMapPin className="mr-3 text-indigo-600" size={20} />
                  <span>{ticket.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="lg:sticky lg:top-4 h-fit">
            <TicketPurchase ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  )
}

