
"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedContent from './AnimatedContent'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Card {
    title: string;
    headline: string;
    description: string;
    buttonText: string;
    link: string;
    image: string;
    tagline?: string;
}

const AthleteCard = ({ card, index, cardRef }: { card: Card; index: number; cardRef: React.RefObject<HTMLDivElement | null> }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Different creative shapes for each card
    const cardShapes = [
        // Card 0: Asymmetric rounded with angled top-right
        "athlete-card-shape-1",
        // Card 1: Organic curve with rounded bottom-left
        "athlete-card-shape-2",
        // Card 2: Diagonal cut with soft corners
        "athlete-card-shape-3"
    ];

    return (
        <div 
            ref={cardRef}
            className={`relative w-full h-[450px] overflow-hidden border border-white/10 group athlete-card-glow ${cardShapes[index]} transition-all duration-300`}
        >
            {/* Background Image - Full Color, No Hover Effects */}
            <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:via-black/60 transition-all duration-300" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                <h3 className="text-2xl font-normal mb-2 text-white">{card.title}</h3>
                <h4 className="text-lg text-[#D4AF37] font-normal mb-4">{card.headline}</h4>

                <div className="mb-4 text-sm text-gray-200 font-light relative">
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        {card.description}
                    </p>
                    {card.description.length > 80 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[#D4AF37] text-xs mt-1 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                            {isExpanded ? 'View Less' : 'View More'}
                        </button>
                    )}
                </div>

                {card.tagline && (
                    <p className="text-sm text-gray-300 italic mb-6 font-light border-l-2 border-[#D4AF37] pl-3">
                        &ldquo;{card.tagline}&rdquo;
                    </p>
                )}

                <Link
                    href={card.link}
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-6 py-3 rounded-none uppercase tracking-wider hover:bg-white transition-all duration-300"
                >
                    {card.buttonText} <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    )
}

export default function AthleteDisplaySection() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const card1Ref = useRef<HTMLDivElement>(null)
    const card2Ref = useRef<HTMLDivElement>(null)
    const card3Ref = useRef<HTMLDivElement>(null)
    
    const cardRefs = [card1Ref, card2Ref, card3Ref]

    const cards = [
        {
            title: "Recreational Athletes",
            headline: "Marathon, Cycling, Triathlon",
            description: "Marathon in Dubai? Cycling in Europe? Triathlon somewhere epic? We package race entries, travel, stays, and recovery support. You run. We handle everything else.",
            buttonText: "KNOW MORE",
            link: "/athlete?type=recreational",
            image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1000" // Marathon (From RecreationalEvents)
        },
        {
            title: "Professional Athletes",
            headline: "Tournaments & Training Camps",
            description: "Tournament dates locked in? Training camp planned? Share your schedule—we handle flights, accommodation, ground transfers, recovery spaces. Your focus stays on performing. Ours stays on supporting you.",
            buttonText: "KNOW MORE",
            link: "/athlete?type=professional",
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop" // Pro athlete gym/training
        },
        {
            title: "Something Different?",
            headline: "We Design Around Your Reality",
            description: "Camps, trials, rehab trips, multi-athlete groups, fan+athlete combos—your situation is unique. Tell us what you're working with, and we'll design an end-to-end solution that fits your exact reality.",
            buttonText: "Tell Us More",
            link: "/enquiry/home",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop" // Stadium/Custom
        }
    ]

    useEffect(() => {
        if (!sectionRef.current || !cardsContainerRef.current) return

        const section = sectionRef.current
        const cards = cardRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[]

        if (cards.length === 0) return

        const ctx = gsap.context(() => {
            // Set initial state - all cards off-screen to the right
            gsap.set(cards, {
                x: '100%',
                opacity: 0,
                scale: 0.9
            })

            // Calculate the scroll distance needed for smooth animation
            // Use viewport height or a minimum value for mobile
            const getScrollDistance = () => {
                if (typeof window === 'undefined') return 2000
                return Math.max(window.innerHeight * 1.5, 1500)
            }

            const scrollDistance = getScrollDistance()

            // Create scroll-triggered sequential animation with pinning
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${scrollDistance}`, // Extend scroll distance for animation
                pin: true, // Pin the section in place during scroll
                pinSpacing: true, // Add spacing to prevent layout shift
                scrub: 1, // Smooth scrubbing tied to scroll position
                anticipatePin: 1, // Smooth pinning transition
                refreshPriority: 1, // Refresh before other ScrollTriggers
                onEnter: () => {
                    // Refresh other ScrollTriggers when pinning starts
                    setTimeout(() => ScrollTrigger.refresh(), 100)
                },
                onLeave: () => {
                    // Refresh other ScrollTriggers when pinning ends
                    setTimeout(() => ScrollTrigger.refresh(), 100)
                },
                onUpdate: (self) => {
                    const progress = self.progress
                    const totalCards = cards.length
                    
                    cards.forEach((card, index) => {
                        // Calculate when each card should start animating
                        // Each card gets equal portion of the scroll progress
                        const cardStart = index / totalCards
                        const cardEnd = (index + 1) / totalCards
                        
                        if (progress >= cardStart) {
                            // Calculate card's individual progress (0-1)
                            const cardProgress = Math.min(
                                (progress - cardStart) / (cardEnd - cardStart),
                                1
                            )
                            
                            // Animate card sliding in from right with easing
                            const easeProgress = gsap.utils.clamp(0, 1, 
                                1 - Math.pow(1 - cardProgress, 2) // ease out quadratic
                            )
                            
                            const xValue = (1 - easeProgress) * 100
                            const scaleValue = 0.9 + (easeProgress * 0.1)
                            
                            // Store values for hover handling
                            card.dataset.gsapX = xValue.toString()
                            card.dataset.gsapScale = scaleValue.toString()
                            
                            // Always set x and opacity, scale will be handled by hover
                            gsap.set(card, {
                                x: `${xValue}%`,
                                opacity: easeProgress,
                                scale: scaleValue
                            })
                        } else {
                            // Card hasn't started yet
                            gsap.set(card, {
                                x: '100%',
                                opacity: 0,
                                scale: 0.9
                            })
                        }
                    })
                }
            })

            // Handle hover to preserve CSS transforms
            const hoverHandlers = cards.map((card) => {
                const handleMouseEnter = () => {
                    // Clear GSAP scale on hover to allow CSS transform
                    gsap.set(card, { clearProps: 'scale' })
                }
                
                const handleMouseLeave = () => {
                    // Restore GSAP scale when not hovering
                    const scale = card.dataset.gsapScale
                    if (scale) {
                        gsap.set(card, { scale: parseFloat(scale) })
                    }
                }
                
                card.addEventListener('mouseenter', handleMouseEnter)
                card.addEventListener('mouseleave', handleMouseLeave)
                
                return { card, handleMouseEnter, handleMouseLeave }
            })

            // Refresh on resize to recalculate scroll distance
            let resizeTimeout: NodeJS.Timeout
            const handleResize = () => {
                clearTimeout(resizeTimeout)
                resizeTimeout = setTimeout(() => {
                    ScrollTrigger.refresh()
                }, 250) // Debounce resize
            }
            
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
                clearTimeout(resizeTimeout)
                // Clean up hover listeners
                hoverHandlers.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
                    card.removeEventListener('mouseenter', handleMouseEnter)
                    card.removeEventListener('mouseleave', handleMouseLeave)
                })
            }
        }, section)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // cardRefs are stable refs created with useRef, safe to omit

    return (
        <section ref={sectionRef} className="py-24 text-white relative overflow-hidden">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <div className="mb-16">
                        <h2 className="text-xl sm:text-3xl font-normal text-left flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                            For Athletes <span className="text-[#D4AF37]">on the Move</span>
                            <div className="h-[2px] sm:h-[4px] w-16 sm:w-24 bg-[#D4AF37] mt-1 hidden sm:block"></div>
                        </h2>
                        <h3 className="text-gray-400 text-sm sm:text-lg font-light italic">You focus on the game. We handle the rest.</h3>
                    </div>
                </AnimatedContent>

                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {cards.map((card, index) => (
                        <AthleteCard 
                            key={index} 
                            card={card} 
                            index={index} 
                            cardRef={cardRefs[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
