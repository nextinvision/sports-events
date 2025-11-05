import Link from 'next/link'
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi'
import TicketCard from '@/components/TicketCard'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import type { Ticket, TicketCategory } from '@/types/prisma'

async function getTickets(category?: string): Promise<Ticket[]> {
  const cacheKey = category ? `tickets:${category}` : 'tickets:all'
  
  // Try to get from cache (non-blocking)
  try {
    const cached = await Promise.race([
      getCache(cacheKey),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 100))
    ])
    if (cached) return cached as Ticket[]
  } catch (error) {
    // Ignore cache errors during build
  }

  const where = category && (category === 'SPORTS' || category === 'CONCERT')
    ? { category: category as TicketCategory, available: { gt: 0 } }
    : { available: { gt: 0 } }
  
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: { date: 'asc' },
    take: 12,
  })

  // Cache for 5 minutes (non-blocking)
  setCache(cacheKey, tickets, 300).catch(() => {
    // Ignore cache errors
  })
  
  return tickets
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const tickets = await getTickets(searchParams.category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Event
          </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Discover and book tickets for the best sports events and concerts
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <FiSearch className="text-gray-400 ml-4" size={20} />
              <input
                type="text"
                placeholder="Search events, artists, teams..."
                className="flex-1 px-4 py-3 text-gray-900 outline-none"
              />
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className={`px-6 py-2 rounded-full transition-colors ${
              !searchParams.category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Events
          </Link>
          <Link
            href="/?category=SPORTS"
            className={`px-6 py-2 rounded-full transition-colors ${
              searchParams.category === 'SPORTS'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sports
          </Link>
          <Link
            href="/?category=CONCERT"
            className={`px-6 py-2 rounded-full transition-colors ${
              searchParams.category === 'CONCERT'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Concerts
          </Link>
        </div>
      </section>

      {/* Tickets Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Available Tickets
        </h2>
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tickets available at the moment.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your tickets in just a few clicks
              </p>
            </div>
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Events</h3>
              <p className="text-gray-600">
                All events are verified and authentic
              </p>
            </div>
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
