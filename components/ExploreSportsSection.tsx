import React from 'react'
import { Gallery4 } from '@/components/ExploreSportsCarousel'

export default function ExploreSportsSection() {
    return (
        <section className="pt-20 pb-4 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-white font-light text-3xl mb-12 flex items-center justify-center gap-4">
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                    Explore Sports
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                </h2>
                <Gallery4
                    title=""
                    description=""
                />
            </div>
        </section>
    )
}
