'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
// import { useAuthCheck } from '@/hooks/useAuthCheck'
import { FiActivity, FiCalendar, FiSettings } from 'react-icons/fi'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  // const { isChecking } = useAuthCheck('/auth/login', true)

  // const { isChecking } = useAuthCheck('/auth/login', true)

  return (
    <div className="min-h-screen bg-[#11212D] flex flex-col">


      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Sports Management Card */}
          <button
            onClick={() => router.push('/admin/sports')}
            className="group cursor-pointer relative bg-white/5 backdrop-blur-sm overflow-hidden rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 p-8 text-left"
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-500 blur-2xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiActivity size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Manage Sports
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Add, edit, or remove sports categories. Manage descriptions and cover images for each sport type available on the platform.
              </p>
            </div>
            <div className="absolute bottom-8 right-8 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              Go to Sports &rarr;
            </div>
          </button>

          {/* Events Management Card */}
          <button
            onClick={() => router.push('/admin/events')}
            className="group cursor-pointer relative bg-white/5 backdrop-blur-sm overflow-hidden rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 p-8 text-left"
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform duration-500 blur-2xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiCalendar size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                Manage Events
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Schedule new events, update details like venues and pricing, or cancel upcoming matches. Assign events to specific sports.
              </p>
            </div>
            <div className="absolute bottom-8 right-8 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              Go to Events &rarr;
            </div>
          </button>
        </div>

        {/* Placeholder for future sections */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            <FiSettings className="animate-spin-slow" />
            More administrative tools coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
