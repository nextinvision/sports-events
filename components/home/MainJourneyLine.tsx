'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function MainJourneyLine() {
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        if (!pathRef.current) return

        const length = pathRef.current.getTotalLength()

        // Simply set styles directly to ensure it's hidden immediately before GSAP takes over
        pathRef.current.style.strokeDasharray = `${length} ${length}`
        pathRef.current.style.strokeDashoffset = `${length}`
        pathRef.current.style.opacity = '1'

        const ctx = gsap.context(() => {
            // Create a scroll trigger that accounts for pinned sections
            // Using refreshPriority ensures this refreshes AFTER pinned sections
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true, // Recalculate when layout changes (pins, etc.)
                    refreshPriority: -1, // Lower priority = refreshes after pinned sections
                }
            })

            // Listen for ScrollTrigger refresh events to handle pin changes
            const handleRefresh = () => {
                // Small delay to ensure pinned sections have updated
                setTimeout(() => {
                    ScrollTrigger.refresh()
                }, 50)
            }

            // Refresh when window resizes or when ScrollTrigger updates
            window.addEventListener('resize', handleRefresh)
            
            // Also refresh after a short delay to account for initial pin setup
            const initialRefresh = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 100)

            return () => {
                window.removeEventListener('resize', handleRefresh)
                clearTimeout(initialRefresh)
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 400"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <defs>
                    {/* Enhanced premium gradient with more color stops */}
                    <linearGradient id="main-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDB931" stopOpacity="1" />
                        <stop offset="15%" stopColor="#FFE55C" stopOpacity="1" />
                        <stop offset="30%" stopColor="#FFFFAC" stopOpacity="1" />
                        <stop offset="50%" stopColor="#E8C547" stopOpacity="1" />
                        <stop offset="70%" stopColor="#FFFFAC" stopOpacity="1" />
                        <stop offset="85%" stopColor="#FFE55C" stopOpacity="1" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
                    </linearGradient>
                    
                    {/* Reduced glow filter for subtle effect */}
                    <filter id="main-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur1" />
                        <feGaussianBlur stdDeviation="2" result="coloredBlur2" />
                        <feMerge>
                            <feMergeNode in="coloredBlur2" />
                            <feMergeNode in="coloredBlur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    
                    {/* Reduced outer glow for depth */}
                    <filter id="main-glow-outer" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="outerBlur" />
                        <feMerge>
                            <feMergeNode in="outerBlur" />
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Outer glow path (behind) - Creative organic flowing curve */}
                <path
                    d="M 90 10 
                       C 85 20, 78 32, 68 48
                       C 55 68, 42 90, 32 115
                       C 25 138, 22 162, 24 185
                       C 28 208, 38 230, 52 250
                       C 68 270, 85 285, 95 295
                       C 88 305, 75 315, 62 325
                       C 52 332, 42 338, 35 342
                       C 28 346, 22 349, 18 352
                       C 15 354, 12 356, 10 358
                       C 8 360, 6 362, 5 365
                       C 4 368, 3 371, 2 375
                       C 1 380, 0 385, 0 390"
                    fill="none"
                    stroke="url(#main-gold-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#main-glow-outer)"
                    opacity="0.1"
                />
                
                {/* Main creative organic curve path - flows naturally from hero bottom to footer */}
                <path
                    ref={pathRef}
                    d="M 90 10 
                       C 85 20, 78 32, 68 48
                       C 55 68, 42 90, 32 115
                       C 25 138, 22 162, 24 185
                       C 28 208, 38 230, 52 250
                       C 68 270, 85 285, 95 295
                       C 88 305, 75 315, 62 325
                       C 52 332, 42 338, 35 342
                       C 28 346, 22 349, 18 352
                       C 15 354, 12 356, 10 358
                       C 8 360, 6 362, 5 365
                       C 4 368, 3 371, 2 375
                       C 1 380, 0 385, 0 390"
                    fill="none"
                    stroke="url(#main-gold-gradient)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#main-glow)"
                    opacity="0"
                />
            </svg>
        </div>
    )
}
