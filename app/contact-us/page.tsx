"use client"

import { useState } from "react"
import type React from "react"
import { SiInstagram, SiX, SiLinkedin, SiWhatsapp, SiGmail } from "react-icons/si"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<"form" | "info">("form")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const socialLinks = [
    { name: "Instagram", icon: SiInstagram, url: "https://www.instagram.com/sreecharan1313/", color: "hover:text-pink-500" },
    { name: "X", icon: SiX, url: "https://www.x.com/in/sree-charan-reddy-m/", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: SiLinkedin, url: "https://www.linkedin.com/in/sree-charan-reddy-m/", color: "hover:text-blue-600" },
    { name: "WhatsApp", icon: SiWhatsapp, url: "https://wa.me/9391975052", color: "hover:text-green-500" },
    { name: "Email", icon: SiGmail, url: "mailto:mscharan1313@gmail.com", color: "hover:text-red-500" },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 hero-background py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
              Have questions about children's rights or want to partner with us? We'd love to hear from you!
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Contact Form - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Send us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 sm:p-5 bg-green-100 border-l-4 border-green-500 rounded-lg animate-in slide-in-from-top">
                    <p className="text-green-700 font-semibold">Thank you! Your message has been sent successfully.</p>
                    <p className="text-green-600 text-sm mt-1">We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base hover:border-gray-400 hover:shadow-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base hover:border-gray-400 hover:shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base hover:border-gray-400 hover:shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message</label>
                    <textarea
                      name="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm sm:text-base hover:border-gray-400 hover:shadow-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-all active:scale-95 text-sm sm:text-base hover:shadow-lg hover:scale-105 transform"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info - Right Side */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Quick Info</h3>

                <div className="space-y-5">
                  <div className="flex gap-4 hover:translate-x-2 transition-transform">
                    <div className="text-2xl">📍</div>
                    <div>
                      <p className="font-semibold text-sm">Address</p>
                      <p className="text-white/90 text-xs sm:text-sm">Puppalaguda, India</p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover:translate-x-2 transition-transform">
                    <div className="text-2xl">📧</div>
                    <div>
                      <p className="font-semibold text-sm">Email</p>
                      <p className="text-white/90 text-xs sm:text-sm break-all">hello@sashakt.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover:translate-x-2 transition-transform">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <p className="font-semibold text-sm">Response Time</p>
                      <p className="text-white/90 text-xs sm:text-sm">24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`aspect-square rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg ${social.color}`}
                        title={social.name}
                        aria-label={social.name}
                      >
                        <Icon className="text-2xl sm:text-3xl" />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl hover:bg-blue-100 hover:scale-105 hover:shadow-lg transition-all transform">
                <p className="text-3xl mb-3 hover:scale-125 transition-transform">❓</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">General Inquiries</p>
                <p className="text-xs sm:text-sm text-gray-600">Questions about our platform and mission</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-pink-50 rounded-xl hover:bg-pink-100 hover:scale-105 hover:shadow-lg transition-all transform">
                <p className="text-3xl mb-3 hover:scale-125 transition-transform">🤝</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Partnerships</p>
                <p className="text-xs sm:text-sm text-gray-600">Collaborate with SASHAKT</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-yellow-50 rounded-xl hover:bg-yellow-100 hover:scale-105 hover:shadow-lg transition-all transform">
                <p className="text-3xl mb-3 hover:scale-125 transition-transform">📚</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Resources</p>
                <p className="text-xs sm:text-sm text-gray-600">Access learning materials</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl hover:bg-green-100 hover:scale-105 hover:shadow-lg transition-all transform">
                <p className="text-3xl mb-3 hover:scale-125 transition-transform">🐛</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Technical Support</p>
                <p className="text-xs sm:text-sm text-gray-600">Report issues and bugs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
