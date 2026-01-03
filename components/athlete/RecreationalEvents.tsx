'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RecreationalEvents() {
    // Refs for animation
    const containerRef = useRef<HTMLDivElement>(null)
    const card1Ref = useRef<HTMLDivElement>(null)
    const card2Ref = useRef<HTMLDivElement>(null)
    const card3Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx = gsap.context(() => { });
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

        const mm = gsap.matchMedia();
        const container = containerRef.current;

        mm.add("(min-width: 768px)", () => {
            // Desktop Animation: Cards float up with different speeds/triggers

            // Center card (Marathon) moves fastest/highest
            gsap.set(card2Ref.current, { y: 200 });
            gsap.to(card2Ref.current, {
                y: -200,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            // Side cards (Cycling, Triathlon) move slower
            const sideCards = [card1Ref.current, card3Ref.current];
            gsap.set(sideCards, { y: 100 });
            gsap.to(sideCards, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                }
            });

            // Initial fade in
            cards.forEach((card) => {
                gsap.from(card, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom+=100",
                        once: true,
                    }
                })
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile Entrance
            gsap.fromTo(cards,
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        once: true,
                    }
                }
            );
        });

        return () => mm.revert();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 md:px-0 w-full" ref={containerRef}>
            <div className="flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-16 justify-center flex-wrap items-center relative z-10 w-full">

                {/* Card 1: Cycling */}
                <div ref={card1Ref} className='relative h-[450px] w-full max-w-[350px] md:h-[500px] md:w-80 lg:w-96 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/cycling" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=1000"
                            alt="Cycling"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Cycling</h3>
                        </div>
                    </Link>
                </div>

                {/* Card 2: Marathon */}
                <div ref={card2Ref} className='relative h-[450px] w-full max-w-[350px] md:h-[500px] md:w-80 lg:w-96 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/marathon" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1000"
                            alt="Marathon"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Marathon</h3>
                        </div>
                    </Link>
                </div>

                {/* Card 3: Triathlon */}
                <div ref={card3Ref} className='relative h-[450px] w-full max-w-[350px] md:h-[500px] md:w-80 lg:w-96 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/triathlon" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1000"
                            alt="Triathlon"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Triathlon</h3>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}
