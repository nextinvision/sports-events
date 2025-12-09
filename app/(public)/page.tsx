import Hero from '@/components/Hero'
import WhatWeOffer from '@/components/WhatWeOffer'
import ContactSection from '@/components/ContactSection'
import ExploreSportsSection from '@/components/ExploreSportsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ExploreSportsSection />
      <WhatWeOffer />
      <ContactSection />
    </div>
  )
}
