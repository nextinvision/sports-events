'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AthleteSelection from '@/components/home/AthleteSelection'
import SportsCarousel from '@/components/atheletes/SportsCarousel'
import RecreationalEvents from '@/components/atheletes/RecreationalEvents'

function AtheletesContent() {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')
    const [activeTab, setActiveTab] = useState<'professional' | 'recreational'>('professional');

    useEffect(() => {
        if (typeParam === 'recreational' || typeParam === 'professional') {
            setActiveTab(typeParam)
        }
    }, [typeParam])

    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection
                activeType={activeTab}
                variant="static"
                showLabels={true}
                onTypeSelect={setActiveTab}
            />

            <div className="mt-4 md:mt-12 relative z-10 pointer-events-auto">
                {activeTab === 'professional' ? (
                    <SportsCarousel hideHeading={true} />
                ) : (
                    <RecreationalEvents />
                )}
            </div>
        </div>
    )
}

export default function AtheletesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <AtheletesContent />
        </Suspense>
    )
}
