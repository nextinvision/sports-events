import Image from 'next/image'

export default function Hero() {
    return (
        <div className="relative h-screen w-full">
            <Image
                src="/header_image.jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/20" /> {/* Optional overlay for better text contrast if needed later */}
            <div className="w-full relative z-10 flex h-full flex-col justify-center items-end max-[375px]:items-center px-6 md:px-12 text-white">
                <div className="w-auto text-left max-[375px]:text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-tight tracking-wide">
                        YOUR NEXT <br />
                        SPORTS <br />
                        <span className="font-extrabold">ADVENTURE</span> <br />
                        STARTS <br />
                        HERE
                    </h1>
                </div>
            </div>
        </div>
    )
}
