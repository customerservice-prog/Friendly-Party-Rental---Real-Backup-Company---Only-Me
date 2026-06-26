'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Facebook, Youtube, ChevronDown } from 'lucide-react'
import { BUSINESS, NAV_RENTALS } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Weddings', href: '/weddings' },
  { name: 'Rentals', href: '/category', hasDropdown: true },
  { name: 'FAQs', href: '/frequently_asked_questions' },
  { name: 'About Us', href: '/about_us' },
  { name: 'Contact Us', href: '/contact_us' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Employment', href: '/employment' },
  { name: 'Service Area', href: '/service-area' },
]

export default function Header() {
  const [rentalsOpen, setRentalsOpen] = useState(false)

  return (
    <header className="w-full">
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-dark">
            <span>
              <a href={`tel:${BUSINESS.phone}`} className="hover:underline font-medium">
                {BUSINESS.phone}
              </a>
              {' | '}
              <a href={`sms:${BUSINESS.text}`} className="hover:underline">Text Us</a>
            </span>
            <a href={`mailto:${BUSINESS.email}`} className="hover:underline">{BUSINESS.email}</a>
            <span>{BUSINESS.address}</span>
            <span>Serving {BUSINESS.serviceArea}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
              <Facebook size={20} />
            </a>
            <a href={BUSINESS.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
              <Youtube size={20} />
            </a>
            <a href={BUSINESS.yelp} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 text-sm font-bold">
              Yelp
            </a>
            <Link href="/order-by-date" className="btn-primary text-sm py-1.5 px-4">
              Book Now ►
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <Link href="/" className="text-center">
            <span className="text-3xl font-bold">
              <span className="text-primary">Friendly</span>
              <span className="text-pink-500"> Party</span>
              <span className="text-purple-600"> Rental</span>
            </span>
          </Link>
        </div>
      </div>

      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center gap-1 md:gap-4 py-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={() => setRentalsOpen(!rentalsOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-body hover:text-secondary font-medium text-sm"
                  >
                    {link.name}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-body hover:text-secondary font-medium text-sm block"
                  >
                    {link.name}
                  </Link>
                )}
                {link.hasDropdown && rentalsOpen && (
                  <div className="absolute top-full left-0 z-50 bg-white border shadow-lg rounded min-w-[280px] py-2 max-h-96 overflow-y-auto">
                    {NAV_RENTALS.map((item, idx) =>
                      'separator' in item ? (
                        <hr key={idx} className="my-1 border-gray-200" />
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-body hover:bg-primary/20 hover:text-dark"
                          onClick={() => setRentalsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
