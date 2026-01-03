'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { cn } from "@/lib/utils"
import SignUpDropdown from '@/components/auth/SignUpDropdown'

export default function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated: storeAuth, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Avoid hydration mismatch by only using the store auth state after mount
  const isAuthenticated = hasMounted ? storeAuth : false

  useEffect(() => {
    setHasMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const isActivePath = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <header className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-500",
      (isScrolled || mobileMenuOpen)
        ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
        : "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 min-[425px]:px-12 py-2">
        <div className="flex items-center justify-between gap-6 relative">
          {/* LEFT: Logo */}
          <Link
            href="/"
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/logo.png"
              alt="Viagosport Logo"
              width={280}
              height={120}
              className="h-20 w-auto object-contain -mt-2 -mb-4"
              priority
            />
          </Link>



          {/* RIGHT: Enquire Now + Sign Up */}
          <div className="flex items-center gap-3">
            <div className="group relative h-full flex items-center">
              <Link
                href="/experiences"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                  isActivePath('/experiences')
                    ? "text-[#D4AF37] bg-white/5"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
              >
                Experiences
                <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              {/* Premium Dropdown Menu - Grid Layout */}
              <div className="absolute top-full left-0 pt-3 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-gradient-to-br from-black/98 via-black/95 to-black/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">


                  {/* Grid Content */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/experiences/football"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">Football</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">Premier matches & tours</p>
                      </Link>

                      <Link
                        href="/experiences/tennis"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">Tennis</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">Grand Slam events</p>
                      </Link>

                      <Link
                        href="/experiences/f1"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">F1/Motorsport</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">Racing championships</p>
                      </Link>

                      <Link
                        href="/experiences/cricket"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">Cricket</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">International series</p>
                      </Link>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-white/10 bg-gradient-to-r from-transparent to-[#D4AF37]/5">
                    <Link
                      href="/experiences"
                      className="text-xs text-[#D4AF37] hover:text-[#F4D03F] font-medium transition-colors inline-flex items-center gap-1 group/footer"
                    >
                      View all experiences
                      <span className="group-hover/footer:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            {/* Athlete Dropdown */}
            <div className="group relative h-full flex items-center">
              <Link
                href="/athlete"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                  isActivePath('/athlete')
                    ? "text-[#D4AF37] bg-white/5"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
              >
                Athlete
                <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              {/* Premium Dropdown Menu */}
              <div className="absolute top-full left-0 pt-3 w-[420px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-gradient-to-br from-black/98 via-black/95 to-black/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent">
                    <h3 className="text-sm font-semibold text-white/90 tracking-wide uppercase">Athlete Programs</h3>
                  </div>

                  {/* Grid Content */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/athlete?type=professional"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">Professional</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">Elite athlete services</p>
                      </Link>

                      <Link
                        href="/athlete?type=recreational"
                        className="group/card relative flex flex-col items-start gap-2 px-5 py-4 text-sm bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="font-semibold text-gray-200 group-hover/card:text-[#D4AF37] transition-colors">Recreational</span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors">Amateur programs</p>
                      </Link>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-white/10 bg-gradient-to-r from-transparent to-[#D4AF37]/5">
                    <Link
                      href="/athlete"
                      className="text-xs text-[#D4AF37] hover:text-[#F4D03F] font-medium transition-colors inline-flex items-center gap-1 group/footer"
                    >
                      View all programs
                      <span className="group-hover/footer:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/events"
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                isActivePath('/events')
                  ? "text-[#D4AF37] bg-white/5"
                  : "text-white hover:text-[#D4AF37] hover:bg-white/5"
              )}
            >
              Event Organiser
            </Link>
            <Link
              href="/news"
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                isActivePath('/news')
                  ? "text-[#D4AF37] bg-white/5"
                  : "text-white hover:text-[#D4AF37] hover:bg-white/5"
              )}
            >
              News & Blogs
            </Link>
            {/* Sign Up Button - Subtle */}
            <button
              onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)}
              className="hidden lg:block px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Sign Up
            </button>
            {/* Enhanced Enquire Now Button - Highlighted */}
            <Link
              href="/enquiry/home"
              className="hidden lg:block relative bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black text-sm px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
            >
              <span className="relative z-10">Enquire Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4D03F] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>



            {/* Enhanced Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300",
                mobileMenuOpen
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <FiMenu
                  size={24}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <FiX
                  size={24}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )}
                />
              </div>
            </button>


            <SignUpDropdown
              isOpen={isSignUpModalOpen}
              onClose={() => setIsSignUpModalOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-x-0 top-[88px] bottom-0 bg-black/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 overflow-hidden",
        mobileMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className={cn(
                  "px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300",
                  isActivePath('/') && pathname === '/'
                    ? "text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Experiences Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'experiences' ? null : 'experiences')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-base text-white hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
                >
                  Experiences
                  <FiChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    activeDropdown === 'experiences' && "rotate-180"
                  )} />
                </button>
                <div className={cn(
                  "ml-4 pl-4 border-l-2 border-white/10 space-y-1 overflow-hidden transition-all duration-300",
                  activeDropdown === 'experiences'
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}>
                  <Link
                    href="/experiences/football"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⚽ Football
                  </Link>
                  <Link
                    href="/experiences/tennis"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🎾 Tennis
                  </Link>
                  <Link
                    href="/experiences/f1"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏎️ F1/Motorsport
                  </Link>
                  <Link
                    href="/experiences/cricket"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏏 Cricket
                  </Link>
                </div>
              </div>

              {/* Athlete Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'athlete' ? null : 'athlete')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-base text-white hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
                >
                  Athlete
                  <FiChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    activeDropdown === 'athlete' && "rotate-180"
                  )} />
                </button>
                <div className={cn(
                  "ml-4 pl-4 border-l-2 border-white/10 space-y-1 overflow-hidden transition-all duration-300",
                  activeDropdown === 'athlete'
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}>
                  <Link
                    href="/athlete?type=professional"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏆 Professional
                  </Link>
                  <Link
                    href="/athlete?type=recreational"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🎯 Recreational
                  </Link>
                </div>
              </div>

              <Link
                href="/events"
                className={cn(
                  "px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300",
                  isActivePath('/events')
                    ? "text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Event Organisers
              </Link>
              <Link
                href="/news"
                className={cn(
                  "px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300",
                  isActivePath('/news')
                    ? "text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                News & Blogs
              </Link>
              <Link
                href="/enquiry/home"
                className={cn(
                  "px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300",
                  isActivePath('/enquiry')
                    ? "text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37] hover:bg-white/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Enquire Now
              </Link>

              {/* Mobile Sign Up Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsSignUpModalOpen(true)
                }}
                className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-6 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all duration-300 active:scale-95"
              >
                Sign Up
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}



