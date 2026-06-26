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
    <Link href={href} className="category-card block group bg-white">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 50vw, 40vw"
          />
        )}
      </div>
      <div className="p-3 text-center border-t-2 border-primary">
        <h3 className="text-sm font-medium text-body group-hover:text-secondary">{name}</h3>
      </div>
    </Link>
  )
}
