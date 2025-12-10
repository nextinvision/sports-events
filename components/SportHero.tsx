import React from 'react'

interface SportHeroProps {
    sport: string
    description: string
    heroImage: string
}

export default function SportHero({ sport, description, heroImage }: SportHeroProps) {
    return (
        <div className="relative w-full h-[60vh] min-h-[500px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt={`${sport} hero`}
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0f172a]" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 capitalize">
                        {sport}
                    </h1>
                    <p className="text-lg text-gray-300 mb-6 capitalize">
                        more details about {sport} section
                    </p>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Decorative Line (Blue Streak) - Simplified representation */}
            <div className="absolute top-0 right-1/4 w-[2px] h-full bg-blue-500/50 rotate-12 blur-sm hidden md:block" />
            <div className="absolute top-0 right-[20%] w-[100px] h-full bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 -skew-x-12 blur-xl pointer-events-none" />
        </div>
    )
}
