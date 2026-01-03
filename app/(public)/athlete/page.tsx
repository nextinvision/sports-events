'use client'

import React, { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import AthleteSelection from '@/components/home/AthleteSelection'
import RecreationalEvents from '@/components/athlete/RecreationalEvents'
import ProfessionalEvents from '@/components/athlete/ProfessionalEvents'
import EnquiryCTA from '@/components/shared/EnquiryCTA'

function AtheletesContent() {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')
    const [activeTab, setActiveTab] = useState<'professional' | 'recreational'>('professional');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeParam === 'recreational' || typeParam === 'professional') {
            setActiveTab(typeParam)
        }
    }, [typeParam])

    const handleTypeSelect = (type: 'professional' | 'recreational') => {
        setActiveTab(type);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection
                activeType={activeTab}
                variant="static"
                showLabels={true}
                onTypeSelect={handleTypeSelect}
            />

            <div
                ref={contentRef}
                className="mb-0 mt-24 md:mt-12 relative z-0 pointer-events-auto scroll-mt-32"
            >
                {activeTab === 'professional' ? (
                    <ProfessionalEvents />
                ) : (
                    <RecreationalEvents />
                )}
            </div>

            <EnquiryCTA
                title={activeTab === 'professional' ? "Elite logistics for elite performance." : "Train like a pro, play like a legend."}
                description={activeTab === 'professional' ? "Focus on the game. We handle the travel, accommodation, and improved logistics." : "Exclusive training camps and recreational tournaments tailored for you."}
                link={activeTab === 'professional' ? "/enquiry/athlete-professional" : "/enquiry/athlete-recreational"}
                buttonLabel="Enquire Now"
            />
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
