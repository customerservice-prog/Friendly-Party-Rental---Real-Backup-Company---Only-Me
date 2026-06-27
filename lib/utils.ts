import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy h:mm a')
}

// Alias for backward compatibility
export const formatDateShort = formatDate

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FPR-${timestamp}-${random}`
}

export function generateQuoteNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `QT-${timestamp}-${random}`
}

export function calculateTax(amount: number, rate: number = 0.08): number {
  return Math.round(amount * rate * 100) / 100
}

export function calculateTotal(subtotal: number, tax: number, delivery: number = 0): number {
  return Math.round((subtotal + tax + delivery) * 100) / 100
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function parseAmount(value: string | number): number {
  if (typeof value === 'number') return value
  return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
}

export const BUSINESS = {
  name: 'Friendly Party Rental',
  legalName: 'Friendly Party Rental L.L.C.',
  phone: '315-884-1498',
  text: '315-884-1498',
  email: 'customerservice@friendlypartyrental.com',
  address: '330 Costello Parkway, Minoa, NY 13116',
  serviceArea: 'Syracuse & Nearby Cities',
  hours: 'Mon-Sat: 8am-6pm, Sun: By Appointment',
  facebook: 'https://www.facebook.com/friendlypartyrental',
  instagram: 'https://www.instagram.com/friendlypartyrental',
  youtube: 'https://www.youtube.com/channel/friendlypartyrental',
  yelp: 'https://www.yelp.com/biz/friendly-party-rental',
  tiktok: 'https://www.tiktok.com/@friendlypartyrental',
  twitter: 'https://twitter.com/friendlypartyrent',
  mapUrl: 'https://maps.google.com/?q=330+Costello+Parkway+Minoa+NY+13116',
}

export const NAV_RENTALS = [
  { name: 'Bounce Houses', href: '/rentals/bounce-houses' },
  { name: 'Water Slides', href: '/rentals/water-slides' },
  { name: 'Combo Units', href: '/rentals/combo-units' },
  { name: 'Obstacle Courses', href: '/rentals/obstacle-courses' },
  { name: 'Interactive Games', href: '/rentals/interactive-games' },
  { name: 'Tents', href: '/rentals/tents' },
  { name: 'Tables & Chairs', href: '/rentals/tables-chairs' },
  { name: 'Concessions', href: '/rentals/concessions' },
  { name: 'Generators', href: '/rentals/generators' },
  { name: 'Yard Games', href: '/rentals/yard-games' },
  { name: 'Carnival Rides', href: '/rentals/carnival-rides' },
  { name: 'Photo Booths', href: '/rentals/photo-booths' },
  { name: 'Dunk Tanks', href: '/rentals/dunk-tanks' },
  { name: 'Foam Machines', href: '/rentals/foam-machines' },
  { name: 'Mechanical Bulls', href: '/rentals/mechanical-bulls' },
  { name: 'Trackless Trains', href: '/rentals/trackless-trains' },
  { name: 'Tents & Canopies', href: '/rentals/tents-canopies' },
  { name: 'All Rentals', href: '/rentals' },
]

export const PUBLIC_CATEGORIES = [
  {
    id: 'bounce-houses',
    name: 'Bounce Houses',
    slug: 'bounce-houses',
    href: '/rentals/bounce-houses',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/bounce-houses.jpg',
    count: 12,
  },
  {
    id: 'water-slides',
    name: 'Water Slides',
    slug: 'water-slides',
    href: '/rentals/water-slides',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/water-slides.jpg',
    count: 8,
  },
  {
    id: 'combo-units',
    name: 'Combo Units',
    slug: 'combo-units',
    href: '/rentals/combo-units',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/combo-units.jpg',
    count: 10,
  },
  {
    id: 'obstacle-courses',
    name: 'Obstacle Courses',
    slug: 'obstacle-courses',
    href: '/rentals/obstacle-courses',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/obstacle-courses.jpg',
    count: 5,
  },
  {
    id: 'interactive-games',
    name: 'Interactive Games',
    slug: 'interactive-games',
    href: '/rentals/interactive-games',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/interactive-games.jpg',
    count: 7,
  },
  {
    id: 'tents',
    name: 'Tents',
    slug: 'tents',
    href: '/rentals/tents',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/tents.jpg',
    count: 6,
  },
  {
    id: 'tables-chairs',
    name: 'Tables & Chairs',
    slug: 'tables-chairs',
    href: '/rentals/tables-chairs',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/tables-chairs.jpg',
    count: 15,
  },
  {
    id: 'concessions',
    name: 'Concessions',
    slug: 'concessions',
    href: '/rentals/concessions',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/concessions.jpg',
    count: 9,
  },
  {
    id: 'generators',
    name: 'Generators',
    slug: 'generators',
    href: '/rentals/generators',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/generators.jpg',
    count: 4,
  },
  {
    id: 'yard-games',
    name: 'Yard Games',
    slug: 'yard-games',
    href: '/rentals/yard-games',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/yard-games.jpg',
    count: 11,
  },
  {
    id: 'carnival-rides',
    name: 'Carnival Rides',
    slug: 'carnival-rides',
    href: '/rentals/carnival-rides',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/carnival-rides.jpg',
    count: 3,
  },
  {
    id: 'photo-booths',
    name: 'Photo Booths',
    slug: 'photo-booths',
    href: '/rentals/photo-booths',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/photo-booths.jpg',
    count: 2,
  },
  {
    id: 'dunk-tanks',
    name: 'Dunk Tanks',
    slug: 'dunk-tanks',
    href: '/rentals/dunk-tanks',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/dunk-tanks.jpg',
    count: 3,
  },
  {
    id: 'foam-machines',
    name: 'Foam Machines',
    slug: 'foam-machines',
    href: '/rentals/foam-machines',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/foam-machines.jpg',
    count: 2,
  },
  {
    id: 'mechanical-bulls',
    name: 'Mechanical Bulls',
    slug: 'mechanical-bulls',
    href: '/rentals/mechanical-bulls',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/mechanical-bulls.jpg',
    count: 1,
  },
  {
    id: 'trackless-trains',
    name: 'Trackless Trains',
    slug: 'trackless-trains',
    href: '/rentals/trackless-trains',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/trackless-trains.jpg',
    count: 1,
  },
  {
    id: 'tents-canopies',
    name: 'Tents & Canopies',
    slug: 'tents-canopies',
    href: '/rentals/tents-canopies',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/tents-canopies.jpg',
    count: 5,
  },
  {
    id: 'lighting',
    name: 'Lighting',
    slug: 'lighting',
    href: '/rentals/lighting',
    image: 'https://files.sysers.com/ersimages/Friendly-Party-Rental/categories/lighting.jpg',
    count: 4,
  },
]

export const WEDDING_PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Basic Wedding Package',
    description: 'Perfect for intimate gatherings. Includes tent, tables, chairs, and basic lighting.',
    price: 345,
    guests: 30,
    signature: false,
    features: [
      '20x20 White Tent',
      '3 Round Tables',
      '30 Folding Chairs',
      'Basic String Lighting',
      'Setup & Breakdown',
    ],
  },
  {
    id: 'pkg-standard',
    name: 'Standard Wedding Package',
    description: 'Great for medium-sized weddings with additional decor and seating.',
    price: 520,
    guests: 50,
    signature: false,
    features: [
      '20x40 White Tent',
      '5 Round Tables',
      '50 Folding Chairs',
      'String Lighting',
      'Dance Floor',
      'Setup & Breakdown',
    ],
  },
  {
    id: 'pkg-premium',
    name: 'Premium Wedding Package',
    description: 'Ideal for larger weddings with premium furnishings and full decor.',
    price: 895,
    guests: 100,
    signature: false,
    features: [
      '40x60 White Tent',
      '10 Round Tables',
      '100 Chiavari Chairs',
      'Chandelier Lighting',
      'Dance Floor',
      'Photo Booth',
      'Setup & Breakdown',
    ],
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Wedding Package',
    description: 'Our most popular package for unforgettable celebrations.',
    price: 1495,
    guests: 150,
    signature: true,
    features: [
      '40x80 White Tent',
      '15 Round Tables',
      '150 Chiavari Chairs',
      'Full Lighting Package',
      'Dance Floor',
      'Photo Booth',
      'Concession Station',
      'Dedicated Coordinator',
      'Setup & Breakdown',
    ],
  },
  {
    id: 'pkg-elite',
    name: 'Elite Wedding Package',
    description: 'The ultimate wedding experience with every amenity included.',
    price: 2495,
    guests: 250,
    signature: true,
    features: [
      'Custom Tent Configuration',
      '25 Round Tables',
      '250 Chiavari Chairs',
      'Premium Lighting Package',
      'Multiple Dance Floors',
      'Photo Booth',
      'Full Concession Package',
      'Dedicated Event Team',
      'Custom Decor',
      'Setup & Breakdown',
    ],
  },
]

export const REVIEWS = [
  {
    id: 'review-1',
    author: 'Sarah M.',
    rating: 5,
    date: '2024-08-15',
    text: 'Absolutely amazing experience! The bounce house was clean, on time, and the kids had a blast. Will definitely be renting again for our next party!',
    source: 'Google',
  },
  {
    id: 'review-2',
    author: 'Mike T.',
    rating: 5,
    date: '2024-07-22',
    text: 'Friendly Party Rental made our company picnic a huge success. Professional staff, great equipment, and very reasonable prices. Highly recommend!',
    source: 'Google',
  },
  {
    id: 'review-3',
    author: 'Jennifer L.',
    rating: 5,
    date: '2024-06-10',
    text: 'We rented a water slide and dunk tank for our summer party. Everything arrived on time and in perfect condition. The kids absolutely loved it!',
    source: 'Facebook',
  },
  {
    id: 'review-4',
    author: 'David R.',
    rating: 5,
    date: '2024-05-28',
    text: 'Best party rental company in Syracuse! Used them for our daughter\'s birthday and they went above and beyond. The tent setup was perfect!',
    source: 'Yelp',
  },
]
