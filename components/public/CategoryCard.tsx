'use client'
import Link from 'next/link'

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
        <div className="relative w-full overflow-hidden" style={{ paddingTop: '75%' }}>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
