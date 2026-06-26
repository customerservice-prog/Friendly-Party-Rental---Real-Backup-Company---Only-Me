'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  url: string
  caption?: string | null
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-dark mb-8 text-center">Gallery</h1>

      {images.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-primary/30 via-pink-200/40 to-purple-200/40 rounded-lg border-2 border-primary flex items-center justify-center"
            >
              <span className="text-4xl opacity-40">📸</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="aspect-square relative rounded-lg overflow-hidden border-2 border-primary">
              <Image src={img.url} alt={img.caption || 'Gallery'} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
