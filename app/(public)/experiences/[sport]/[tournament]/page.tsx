import SportHero from '@/components/experiences/SportHero'
import Link from 'next/link'

// Mock data generator based on sport and tournament
const getTournamentData = (sport: string, tournament: string) => {
    // Decode url encoded strings
    const decodedSport = decodeURIComponent(sport);
    const decodedTournament = decodeURIComponent(tournament).replace(/-/g, ' ');

    // Default images
    const heroImages: Record<string, string> = {
        football: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1920",
        basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1920",
        tennis: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1920",
        cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1920",
        rugby: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1920",
    }

    const cardImages: Record<string, string> = {
        football: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        basketball: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800",
        tennis: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800",
        cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
        rugby: "https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=800",
    }

    // Mock matches data
    const matches = [
        {
            id: "match-1",
            team1: { name: "Thunder Strikers", logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=200&h=200" },
            team2: { name: "Eagle Warriors", logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=200&h=200" },
            date: "OCT 24, 2025",
            time: "18:00 Local",
            venue: "Grand Arena"
        },
        {
            id: "match-2",
            team1: { name: "Crimson Tide", logo: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=200&h=200" },
            team2: { name: "Royal Knights", logo: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=200&h=200" },
            date: "OCT 26, 2025",
            time: "20:30 Local",
            venue: "City Stadium"
        },
        {
            id: "match-3",
            team1: { name: "Golden Falcons", logo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200&h=200" },
            team2: { name: "Shadow Vipers", logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200&h=200" },
            date: "NOV 01, 2025",
            time: "16:15 Local",
            venue: "Olympia Park"
        },
        {
            id: "match-4",
            team1: { name: "Iron Giants", logo: "https://images.unsplash.com/photo-1508614589041-895b8cba3e51?auto=format&fit=crop&q=80&w=200&h=200" },
            team2: { name: "Neon Stars", logo: "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?auto=format&fit=crop&q=80&w=200&h=200" },
            date: "NOV 05, 2025",
            time: "19:00 Local",
            venue: "Central Dome"
        }
    ];

    return {
        name: decodedTournament,
        description: `Experience the thrill of the ${decodedTournament}, the premier ${decodedSport} tournament. Join thousands of fans and witness history in the making.`,
        heroImage: heroImages[decodedSport.toLowerCase()] || heroImages.football,
        cardImage: cardImages[decodedSport.toLowerCase()] || cardImages.football,
        matches: matches
    }
}

export default async function TournamentPage({ params }: { params: Promise<{ sport: string, tournament: string }> }) {
    const { sport, tournament } = await params
    const data = getTournamentData(sport, tournament)

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Hero Section */}
            <SportHero
                sport={data.name}
                description={data.description}
                heroImage={data.heroImage}
                cardImage={data.cardImage}
            />

            {/* Matches Section */}
            <div className="w-full py-16 relative z-10 container mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-10 w-1.5 bg-yellow-500 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-normal uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                        Matches
                    </h2>
                </div>

                <div className="flex flex-col gap-6">
                    {data.matches.map((match) => (
                        <Link
                            href={`/experiences/${sport}/${tournament}/${match.id}`}
                            key={match.id}
                            className="block w-full bg-neutral-900/40 border border-white/5 p-4 md:p-6 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900/80 hover:border-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] cursor-pointer"
                        >

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

                                {/* Team 1 Card */}
                                <div className="w-full md:w-5/12">
                                    <div className="relative flex flex-col items-center justify-center gap-4">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                                            <img
                                                src={match.team1.logo}
                                                alt={match.team1.name}
                                                className="w-full h-full object-cover rounded-full border-2 border-neutral-700"
                                            />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-normal uppercase tracking-wider text-center text-white">
                                            {match.team1.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* VS Section */}
                                <div className="w-full md:w-2/12 flex flex-col items-center justify-center gap-2 relative z-10 shrink-0 px-4">
                                    <div className="text-center relative w-full flex justify-center">
                                        <span className="text-5xl md:text-6xl italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] pr-2">
                                            VS
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="text-yellow-500/80 font-normal tracking-widest text-xs uppercase">
                                            {match.date}
                                        </div>
                                        <div className="text-white font-mono text-base bg-neutral-800 px-3 py-0.5 rounded-full border border-white/10">
                                            {match.time}
                                        </div>
                                        <div className="text-neutral-500 text-[10px] mt-1 uppercase tracking-wide">
                                            {match.venue}
                                        </div>
                                    </div>
                                </div>

                                {/* Team 2 Card */}
                                <div className="w-full md:w-5/12">
                                    <div className="relative flex flex-col items-center justify-center gap-4">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                                            <img
                                                src={match.team2.logo}
                                                alt={match.team2.name}
                                                className="w-full h-full object-cover rounded-full border-2 border-neutral-700"
                                            />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-normal uppercase tracking-wider text-center text-white">
                                            {match.team2.name}
                                        </h3>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
