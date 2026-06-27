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

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'yyyy-MM-dd')
}

export function generateOrderNumber(): string {
  const now = new Date()
  const prefix = format(now, 'yyMMdd')
  const random = Math.floor(Math.random() * 9000) + 1000
  return `FPR${prefix}${random}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const PUBLIC_CATEGORIES = [
  {
    slug: 'order-by-date',
    name: 'Order by Date',
    href: '/order-by-date',
    image: 'https://files.sysers.com/cp/upload/315/editor/med/NewOrderByDate.png',
  },
  {
    slug: 'weddings',
    name: 'Weddings',
    href: '/weddings',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/victoria-grady_r-tagg-2546-2.jpg',
  },
  {
    slug: 'table-chair-rentals',
    name: 'Table & Chair Rentals — Syracuse, NY',
    href: '/category/table-chair-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_38_40-AM.png',
  },
  {
    slug: 'tent-rentals',
    name: 'Tent Rentals — Syracuse, NY',
    href: '/category/tent-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_38_16-AM.png',
  },
  {
    slug: 'dance-floor-stage-rentals',
    name: 'Dance Floor & Stage Rentals — Syracuse, NY',
    href: '/category/dance-floor-stage-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_41_14-AM.png',
  },
  {
    slug: 'party-rental-packages',
    name: 'Party Rental Packages — Syracuse, NY',
    href: '/category/party-rental-packages',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_39_22-AM.png',
  },
  {
    slug: 'beverage-food-service',
    name: 'Beverage & Food Service Rentals — Syracuse, NY',
    href: '/category/beverage-food-service',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_44_30-AM.png',
  },
  {
    slug: 'heater-fan-rentals',
    name: 'Heater & Fan Rentals — Syracuse, NY',
    href: '/category/heater-fan-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_47_00-AM.png',
  },
  {
    slug: 'linen-rentals',
    name: 'Linen & Tablecloth Rentals — Syracuse, NY',
    href: '/category/linen-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_05-AM.png',
  },
  {
    slug: 'concession-machine-rentals',
    name: 'Concession Machine Rentals — Syracuse, NY',
    href: '/category/concession-machine-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_42_03-AM.png',
  },
  {
    slug: 'yard-game-rentals',
    name: 'Yard Game Rentals — Syracuse, NY',
    href: '/category/yard-game-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_37_29-AM.png',
  },
  {
    slug: 'event-lighting-rentals',
    name: 'Event Lighting Rentals — Syracuse, NY',
    href: '/category/event-lighting-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_24-AM.png',
  },
  {
    slug: 'generator-rentals',
    name: 'Generator Rentals — Syracuse, NY',
    href: '/category/generator-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_58-AM.png',
  },
  {
    slug: 'photobooth-rentals',
    name: 'Photobooth Rentals — Syracuse, NY',
    href: '/category/photobooth-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_39_03-AM.png',
  },
  {
    slug: 'foam-party-machine-rentals',
    name: 'Foam Party Machine Rentals — Syracuse, NY',
    href: '/category/foam-party-machine-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_48_33-AM.png',
  },
  {
    slug: 'inflatable-movie-screen-rentals',
    name: 'Inflatable Movie Screen Rentals — Syracuse, NY',
    href: '/category/inflatable-movie-screen-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_49_44-AM.png',
  },
  {
    slug: 'bounce-house-rentals',
    name: 'Bounce House Rentals — Syracuse, NY',
    href: '/category/bounce-house-rentals',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Mar-10--2026--04_18_04-PM.png',
  },
  {
    slug: 'party-rental-accessories',
    name: 'Party Rental Accessories — Syracuse, NY',
    href: '/category/party-rental-accessories',
    image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Jun-9--2026--05_10_38-AM.png',
  },
]

export const WEDDING_PACKAGES = [
  {
    name: 'Backyard Elopement',
    price: '$345.00',
    guests: 'Up to 30 guests',
    popular: false,
    signature: false,
    items: [
      'Pole Tent (10x10 or 10x20)',
      'Up to 4 Folding Tables',
      'Up to 30 White Folding Chairs',
      'White Table Linens',
      'Delivery, Setup & Breakdown',
    ],
  },
  {
    name: 'Classic Ceremony',
    price: '$520.00',
    guests: 'Up to 50 guests',
    popular: false,
    signature: false,
    items: [
      'Pole Tent (10x20 or 20x20)',
      'Up to 6 Folding Tables',
      'Up to 50 White Folding Chairs',
      'White Table Linens',
      'Basic Centerpiece Accents',
      'Delivery, Setup & Breakdown',
    ],
  },
  {
    name: 'Garden Reception',
    price: '$2,380.00',
    guests: 'Up to 100 guests',
    popular: true,
    signature: false,
    items: [
      'Pole Tent (20x30 or 20x40)',
      'Up to 10 Round Banquet Tables',
      'Up to 100 Chiavari or Folding Chairs',
      'Premium White/Ivory Linens',
      'Décor & Centerpieces',
      'Portable Dance Floor',
      'String Lights/Uplighting',
      'Delivery, Setup & Breakdown',
    ],
  },
  {
    name: 'Luxury Estate',
    price: '$5,165.00',
    guests: 'Up to 150 guests',
    popular: false,
    signature: false,
    items: [
      'Large Pole Tent (40x60 or larger)',
      'Up to 16 Round Banquet Tables',
      'Up to 150 Chiavari Chairs (Gold or White)',
      'Luxury Satin Linens & Napkins',
      'Full Dance Floor & Cocktail Tables',
      'Uplighting & Bistro String Lights',
      'Delivery, Setup & Breakdown',
    ],
  },
  {
    name: 'All-Inclusive Premium',
    price: '$6,925.00',
    guests: 'Up to 200 guests',
    popular: false,
    signature: true,
    items: [
      'Premium Pole Tent (40x80 or larger)',
      'Up to 20 Round Banquet Tables',
      'Up to 200 Chiavari Chairs (Gold or White)',
      'Luxury Linens, Napkins & Sashes',
      'Large Dance Floor & Cocktail Tables',
      'Full Uplighting & Bistro String Lights',
      'Portable Photo Booth & Generator',
      'Delivery, Setup & Breakdown',
    ],
  },
]
