import { Calendar, MapPin } from 'lucide-react'

// Mock data generator for the match
const getMatchData = (sport: string, tournament: string, matchId: string) => {
    // Decode strings
    const decodedTournament = decodeURIComponent(tournament).replace(/-/g, ' ');

    // Mock matches data (Same as in tournament page for consistency)
    const matches = [
        {
            id: "match-1",
            title: "Thunder Strikers vs Eagle Warriors",
            team1: "Thunder Strikers",
            team2: "Eagle Warriors",
            date: "OCT 24, 2025",
            time: "18:00 Local",
            venue: "Grand Arena",
            description: "Experience the electrifying clash between the Thunder Strikers and the Eagle Warriors. Both teams are at the peak of their form, promising an unforgettable showdown filled with intense action and strategic plays.",
            price: 150,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-2",
            title: "Crimson Tide vs Royal Knights",
            team1: "Crimson Tide",
            team2: "Royal Knights",
            date: "OCT 26, 2025",
            time: "20:30 Local",
            venue: "City Stadium",
            description: "Witness the Crimson Tide take on the Royal Knights in a battle for dominance. With high stakes and passionate fans, this match is set to be a classic encounter in the tournament's history.",
            price: 180,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-3",
            title: "Golden Falcons vs Shadow Vipers",
            team1: "Golden Falcons",
            team2: "Shadow Vipers",
            date: "NOV 01, 2025",
            time: "16:15 Local",
            venue: "Olympia Park",
            description: "The Golden Falcons face off against the Shadow Vipers. Expect a tactical masterclass as two of the most disciplined teams in the league go head-to-head for crucial points.",
            price: 160,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-4",
            title: "Iron Giants vs Neon Stars",
            team1: "Iron Giants",
            team2: "Neon Stars",
            date: "NOV 05, 2025",
            time: "19:00 Local",
            venue: "Central Dome",
            description: "A clash of styles as the sturdy Iron Giants meet the flashy Neon Stars. Will power prevail over speed? Find out in this exciting matchup at the Central Dome.",
            price: 140,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        }
    ];

    const matchData = matches.find(m => m.id === matchId) || matches[0];

    return {
        ...matchData,
        // Ensure some fields are always present if mock data changes
        heroImage: matchData.heroImage || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        location: matchData.venue
    }
}

export default async function MatchPage({ params }: { params: Promise<{ sport: string, tournament: string, match: string }> }) {
    const { sport, tournament, match } = await params
    const data = getMatchData(sport, tournament, match)

    return (
        <div className="min-h-screen bg-black text-white relative font-sans">

            {/* Custom Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.heroImage}
                        alt="Match Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlays matching the design */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 pb-12 w-full">
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-6">

                        {/* Circular Logo */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
                                <div className="text-center text-xs text-black font-semibold leading-tight">
                                    VS
                                </div>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex-grow mb-2 md:mb-0">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                {data.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-200">
                                <span>{data.date}, {data.time}</span>

                                <span className="px-3 py-1 bg-[#84cc16] text-black text-xs font-bold uppercase tracking-wider rounded">
                                    Date Confirmed
                                </span>

                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                    <span>{data.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Card Section */}
            <div className="relative z-10 container mx-auto px-4 mt-8 pb-20">
                <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/5">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column: Description */}
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl md:text-3xl font-medium text-white mb-2">
                                {data.title}
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                {data.date}, {data.time}
                            </p>

                            <p className="text-gray-300 leading-relaxed text-sm md:text-base text-justify">
                                {data.description}
                            </p>
                        </div>

                        {/* Right Column: CTA */}
                        <div className="lg:w-1/3 flex flex-col justify-center items-start lg:items-end lg:text-right mt-8 lg:mt-0">
                            <p className="text-xl md:text-2xl text-white font-normal mb-4">
                                From {data.price} $ .
                            </p>

                            <button className="bg-[#D4AF37] hover:bg-[#b5952f] text-black font-semibold text-lg px-8 py-3 rounded-lg w-full md:w-auto transition-colors shadow-lg">
                                Buy Tickets
                            </button>

                            <p className="text-gray-500 text-xs mt-4">
                                Get your tickets 1 - 3 days before event.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
