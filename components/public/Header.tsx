'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Facebook, Youtube, ChevronDown } from 'lucide-react'
import { BUSINESS, NAV_RENTALS } from '@/lib/utils'

const LOGO_URL = 'https://files.sysers.com/cp/upload/315/editor/1.png'

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
    <header className="w-full bg-primary">
      {/* 3-column header row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* LEFT column */}
          <div className="text-sm text-body leading-relaxed">
            <p>
              <a href={`tel:${BUSINESS.phone}`} className="font-bold text-dark hover:underline">
                {BUSINESS.phone}
              </a>
              {' | '}
              <a href={`sms:${BUSINESS.text}`} className="font-bold text-dark hover:underline">
                Text Us
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="hover:underline">
                {BUSINESS.email}
              </a>
            </p>
            <p>| {BUSINESS.address}</p>
            <p>Serving {BUSINESS.serviceArea}</p>
          </div>

          {/* CENTER column — logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src={LOGO_URL}
                alt="Friendly Party Rental"
                width={280}
                height={80}
                className="h-auto w-auto max-h-[80px] max-w-[280px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* RIGHT column — social + Book Now */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700"
                aria-label="Facebook"
              >
                <Facebook size={24} fill="currentColor" />
              </a>
              <a
                href={BUSINESS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href={BUSINESS.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-bold text-sm"
                aria-label="Yelp"
              >
                Yelp
              </a>
            </div>
            <Link href="/order-by-date" className="btn-primary text-sm py-2 px-5 whitespace-nowrap">
              Book Now ►
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar — golden yellow background, single row on desktop */}
      <nav className="border-t border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-x-1 lg:gap-x-0 py-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={() => setRentalsOpen(!rentalsOpen)}
                    className="flex items-center gap-0.5 px-2 lg:px-3 py-2 text-body hover:text-dark font-medium text-sm whitespace-nowrap"
                  >
                    {link.name}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-2 lg:px-3 py-2 text-body hover:text-dark font-medium text-sm block whitespace-nowrap"
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
