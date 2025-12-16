import Hero from '@/components/home/Hero'
import JourneyLine from '@/components/home/JourneyLine'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import ExploreSportsSection from '@/components/home/ExploreSportsSection'
import ExploreEventsSection from '@/components/home/ExploreEventsSection'
import NewsSection from '@/components/home/NewsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <JourneyLine />
      <Hero />
      <ExploreSportsSection />
      <ExploreEventsSection />
      <WhatWeOffer />
      <NewsSection />
    </div>
  )
}
