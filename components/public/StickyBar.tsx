'use client'

import Link from 'next/link'
import { BUSINESS } from '@/lib/utils'

export default function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-center gap-4">
        <Link href="/order-by-date" className="btn-primary flex-1 max-w-xs text-center">
          Book Now
        </Link>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="btn-accent flex-1 max-w-xs text-center"
        >
          Call Us
        </a>
      </div>
    </div>
  )
}
