'use client'

import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log(formData)
    }

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Get in <span className="text-[#D4AF37]">Touch</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions regarding our specific services? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-8">
                            Contact Information
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#D4AF37]/10 p-3 rounded-lg flex-shrink-0">
                                    <FiMail className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Email</h3>
                                    <p className="text-gray-400">support@viagosport.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#D4AF37]/10 p-3 rounded-lg flex-shrink-0">
                                    <FiPhone className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-[#D4AF37]/10 p-3 rounded-lg flex-shrink-0">
                                    <FiMapPin className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Office</h3>
                                    <p className="text-gray-400">
                                        123 Sports Avenue
                                        <br />
                                        Stadium District, ST 12345
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all resize-none text-white placeholder-gray-500"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#D4AF37] text-black py-4 rounded-lg font-bold hover:bg-[#D4AF37]/90 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <FiSend className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
