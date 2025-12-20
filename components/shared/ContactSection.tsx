import React from 'react'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

export default function ContactSection() {
    return (
        <section className="py-16 bg-black text-white relative overflow-hiddenborder-t border-white/10">
            {/* Background decoration to enhance glassmorphism effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Text */}
                    <div className="text-left md:pr-12 pt-2">
                        <h2 className="text-xl sm:text-3xl font-normal mb-6 text-white">Contact <span className="text-[#D4AF37]">Us</span></h2>
                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                            Have questions about our events or services? We're here to help!
                            Reach out to our team and we'll get back to you as soon as possible.
                        </p>
                        <p className="text-sm text-gray-300 mb-2">
                            <span className="text-[#D4AF37]">Email:</span> support@viagosport.com
                        </p>
                        <p className="text-sm text-gray-300">
                            <span className="text-[#D4AF37]">Phone:</span> +1 (555) 123-4567
                        </p>

                        <div className="flex space-x-4 mt-8">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                aria-label="Facebook"
                            >
                                <FiFacebook size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                aria-label="Twitter"
                            >
                                <FiTwitter size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                aria-label="Instagram"
                            >
                                <FiInstagram size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-normal text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-600 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-normal text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-600 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-normal text-gray-300">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-600 transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-normal text-gray-300">
                                    Subject
                                </label>
                                <textarea
                                    id="subject"
                                    rows={4}
                                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-600 transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#D4AF37]/90 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
