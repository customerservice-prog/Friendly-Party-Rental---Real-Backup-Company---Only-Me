'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { REVIEWS } from '@/lib/utils'

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const visible = 2

  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length)
  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)

  const displayed = []
  for (let i = 0; i < visible; i++) {
    displayed.push(REVIEWS[(current + i) % REVIEWS.length])
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2 text-dark">Google Reviews</h2>
        <p className="text-center text-body mb-8">
          ⭐ 4.6 stars · 92 reviews
        </p>
        <div className="flex items-center gap-4">
          <button onClick={prev} className="p-2 hover:bg-gray-200 rounded-full" aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {displayed.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-dark">{review.author}</span>
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-body text-sm">{review.text}</p>
              </div>
            ))}
          </div>
          <button onClick={next} className="p-2 hover:bg-gray-200 rounded-full" aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
