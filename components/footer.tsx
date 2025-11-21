"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 px-6 border-t border-gray-700 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="interactive-card p-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <span className="text-2xl animate-bounce">⭐</span>
              SASHAKT
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Empowering children through engaging learning about their rights and skills enhancement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 hover:text-yellow-300 transition-colors">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/rights"
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Child Rights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 hover:text-yellow-300 transition-colors">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
              <p className="hover:translate-x-2 transition-transform duration-300">📧 Email: hello@sashakt.com</p>
              <p className="hover:translate-x-2 transition-transform duration-300">📞 Phone: +91 91453 04584</p>
              <a className="hover:translate-x-2 transition-transform duration-300" href="https://www.linkedin.com/in/sree-charan-reddy-m/">🌐 Follow us on social media</a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 dark:text-gray-400">
          <p>&copy; {currentYear} SASHAKT. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="https://generator.lorem-ipsum.info/terms-and-conditions" target="_blank" className="hover:text-white hover:scale-110 transition-all duration-300 transform">
              Privacy Policy
            </Link>
            <Link href="https://generator.lorem-ipsum.info/terms-and-conditions" target="_blank" className="hover:text-white hover:scale-110 transition-all duration-300 transform">
              Terms of Service
            </Link>
            <Link href="https://generator.lorem-ipsum.info/terms-and-conditions" target="_blank" className="hover:text-white hover:scale-110 transition-all duration-300 transform">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
