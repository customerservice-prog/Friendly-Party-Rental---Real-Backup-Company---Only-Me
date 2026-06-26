'use client'

import Link from 'next/link'
import Image from 'next/image'

interface CategoryCardProps {
  name: string
  href: string
  image?: string
}

export default function CategoryCard({ name, href, image }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="border-2 rounded overflow-hidden hover:shadow-lg transition-shadow"
        style={{ borderColor: '#EEC400' }}>
        <div className="bg-white px-2 py-1 text-center text-sm font-medium"
          style={{ color: 'rgb(86,86,86)' }}>
          {name}
        </div>
        <div className="relative w-full" style={{ paddingTop: '75%' }}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-4xl">
              🎉
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
