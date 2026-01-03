"use client"

import React from 'react'
import Image from "next/image"
import AnimatedContent from "@/components/home/AnimatedContent"
import RecreationalAthleteEnquiryForm from "@/components/enquiry/RecreationalAthleteEnquiryForm"

export default function RecreationalAthleteEnquiryPage() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-yellow-500/30">

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src="/images/events-hero.png"
                        alt="Stadium at night"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent backdrop-blur-[2px] z-20" />
                </div>

                <div className="container mx-auto px-6 md:px-24 relative z-30 pt-20">
                    <AnimatedContent distance={150} direction="vertical" animateOpacity duration={0.8}>
                        <h1 className="text-4xl md:text-6xl font-normal max-w-4xl tracking-tight leading-tight mb-6">
                            You earn the finish line. <br />
                            We prepare the journey.
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 font-normal max-w-2xl leading-relaxed">
                            Dream race in an amazing location? Let&apos;s make it smooth, fun, and unforgettable.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 bg-black pb-32">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <h2 className="text-2xl md:text-4xl font-normal mb-12 text-white flex items-center gap-6">
                            Recreational Athlete Enquiry
                            <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                        </h2>
                    </AnimatedContent>

                    <div className="max-w-4xl">
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.1}>
                            <RecreationalAthleteEnquiryForm />
                        </AnimatedContent>
                    </div>
                </div>
            </section>
        </div>
    )
}
