import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface WeddingPackageCardProps {
  id: string
  name: string
  price: number
  guests: number
  items: string[]
  popular?: boolean
  signature?: boolean
  packageNumber?: number
}

export default function WeddingPackageCard({
  id,
  name,
  price,
  guests,
  items,
  popular,
  signature,
  packageNumber,
}: WeddingPackageCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden ${popular ? 'border-secondary' : 'border-primary'}`}>
      {popular && (
        <div className="bg-secondary text-white text-center py-1 text-sm font-bold">
          MOST POPULAR
        </div>
      )}
      {signature && (
        <div className="bg-purple-600 text-white text-center py-1 text-sm font-bold">
          SIGNATURE
        </div>
      )}
      <div className="p-6">
        {packageNumber && !signature && (
          <p className="text-sm text-body mb-1">PACKAGE {packageNumber}</p>
        )}
        <h3 className="text-xl font-bold text-dark mb-1">{name}</h3>
        <p className="text-3xl font-bold text-secondary mb-1">{formatCurrency(price)}</p>
        <p className="text-body text-sm mb-4">Up to {guests} guests</p>
        <ul className="space-y-2 mb-6">
          {items.map((item) => (
            <li key={item} className="text-sm text-body flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <Link
          href={`/wedding-packages?package=${id}`}
          className="btn-primary block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
