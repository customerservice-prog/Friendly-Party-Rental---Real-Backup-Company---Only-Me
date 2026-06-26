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
    <Link href={href} className="category-card block group">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-pink-200/40 to-purple-200/40 flex items-center justify-center">
          <span className="text-4xl opacity-50">🎉</span>
        </div>
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-medium text-body group-hover:text-secondary">{name}</h3>
      </div>
    </Link>
  )
}
