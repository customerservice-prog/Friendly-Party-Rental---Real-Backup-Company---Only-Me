'use client'

import Link from 'next/link'
import { BUSINESS } from '@/lib/utils'

export default function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-center gap-4">
        <Link
          href="/order-by-date"
          className="bg-secondary text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors flex-1 max-w-xs text-center"
        >
          Book Now
        </Link>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="bg-accent text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition-colors flex-1 max-w-xs text-center"
        >
          Call Us
        </a>
      </div>
    </div>
  )
}
