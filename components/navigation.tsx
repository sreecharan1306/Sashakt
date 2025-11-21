"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "rights", label: "Rights", href: "/rights" },
    { id: "about", label: "About", href: "/about" },
    { id: "parental", label: "Parental Hub", href: "/parental-hub" },
    { id: "contact", label: "Contact Us", href: "/contact-us" },
    { id: "faq", label: "FAQ", href: "/faq" },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-gray-900 dark:bg-black text-white py-3 px-4 md:py-4 md:px-6 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-3xl animate-bounce">⭐</div>
          <span className="text-xl md:text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors duration-300">
            SASHAKT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-underline font-medium transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 text-sm md:text-base ${
                isActive(item.href) ? "active text-white text-lg font-bold" : "text-gray-300 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800"
          onClick={() => setOpen((s) => !s)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2 px-3 rounded-md text-sm font-medium ${isActive(item.href) ? "text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
