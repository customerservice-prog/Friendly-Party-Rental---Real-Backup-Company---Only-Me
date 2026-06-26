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
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const BUSINESS = {
  name: 'Friendly Party Rental',
  legalName: 'Party Rental L.L.C.',
  phone: '315-884-1498',
  text: '315-884-1498',
  email: 'customerservice@friendlypartyrental.com',
  address: '330 Costello Parkway, Minoa, NY 13116',
  serviceArea: 'Syracuse & Nearby Cities',
  facebook: 'https://www.facebook.com/profile.php?id=61554646135412',
  youtube: 'https://www.youtube.com/@friendlypartyrental6272',
  yelp: 'https://www.yelp.com/biz/friendly-party-rental-syracuse',
  hours: 'Mon-Fri 8AM-6PM, Sat 8AM-4PM, Sun by appointment',
}

export const WEDDING_PACKAGES = [
  {
    id: 'package-1',
    name: 'Backyard Elopement',
    price: 345,
    guests: 30,
    popular: false,
    items: [
      'Pole Tent (10x10 or 10x20)',
      'Up to 4 Folding Tables',
      'Up to 30 White Folding Chairs',
      'White Table Linens',
      'Delivery, Setup & Breakdown',
    ],
  },
  {
    id: 'package-2',
    name: 'Classic Ceremony',
    price: 520,
    guests: 50,
    popular: false,
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
    id: 'package-3',
    name: 'Garden Reception',
    price: 2380,
    guests: 100,
    popular: true,
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
    id: 'package-4',
    name: 'Luxury Estate',
    price: 5165,
    guests: 150,
    popular: false,
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
    id: 'package-5',
    name: 'All-Inclusive Premium',
    price: 6925,
    guests: 200,
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

export const PUBLIC_CATEGORIES = [
  { name: 'Order by Date', slug: 'order-by-date', href: '/order-by-date', image: '/images/categories/order-by-date.jpg' },
  { name: 'Weddings', slug: 'weddings', href: '/weddings', image: '/images/categories/weddings.jpg' },
  { name: 'Table & Chair Rentals — Syracuse, NY', slug: 'table-chair-rentals', href: '/category/table-chair-rentals', image: '/images/categories/tables-chairs.jpg' },
  { name: 'Tent Rentals — Syracuse, NY', slug: 'tent-rentals', href: '/category/tent-rentals', image: '/images/categories/tents.jpg' },
  { name: 'Dance Floor & Stage Rentals — Syracuse, NY', slug: 'dance-floor-stage-rentals', href: '/category/dance-floor-stage-rentals', image: '/images/categories/dance-floor.jpg' },
  { name: 'Party Rental Packages — Syracuse, NY', slug: 'party-rental-packages', href: '/category/party-rental-packages', image: '/images/categories/packages.jpg' },
  { name: 'Beverage & Food Service Rentals — Syracuse, NY', slug: 'beverage-food-service', href: '/category/beverage-food-service', image: '/images/categories/beverage.jpg' },
  { name: 'Heater & Fan Rentals — Syracuse, NY', slug: 'heater-fan-rentals', href: '/category/heater-fan-rentals', image: '/images/categories/heating.jpg' },
  { name: 'Linen & Tablecloth Rentals — Syracuse, NY', slug: 'linen-rentals', href: '/category/linen-rentals', image: '/images/categories/linens.jpg' },
  { name: 'Concession Machine Rentals — Syracuse, NY', slug: 'concession-machine-rentals', href: '/category/concession-machine-rentals', image: '/images/categories/concessions.jpg' },
  { name: 'Yard Game Rentals — Syracuse, NY', slug: 'yard-game-rentals', href: '/category/yard-game-rentals', image: '/images/categories/yard-games.jpg' },
  { name: 'Event Lighting Rentals — Syracuse, NY', slug: 'event-lighting-rentals', href: '/category/event-lighting-rentals', image: '/images/categories/lighting.jpg' },
  { name: 'Generator Rentals — Syracuse, NY', slug: 'generator-rentals', href: '/category/generator-rentals', image: '/images/categories/generator.jpg' },
  { name: 'Photobooth Rentals — Syracuse, NY', slug: 'photobooth-rentals', href: '/category/photobooth-rentals', image: '/images/categories/photobooth.jpg' },
  { name: 'Foam Party Machine Rentals — Syracuse, NY', slug: 'foam-party-machine-rentals', href: '/category/foam-party-machine-rentals', image: '/images/categories/foam.jpg' },
  { name: 'Inflatable Movie Screen Rentals — Syracuse, NY', slug: 'inflatable-movie-screen-rentals', href: '/category/inflatable-movie-screen-rentals', image: '/images/categories/movie-screen.jpg' },
  { name: 'Bounce House Rentals — Syracuse, NY', slug: 'bounce-house-rentals', href: '/category/bounce-house-rentals', image: '/images/categories/bounce-houses.jpg' },
  { name: 'Party Rental Accessories — Syracuse, NY', slug: 'party-rental-accessories', href: '/category/party-rental-accessories', image: '/images/categories/accessories.jpg' },
]

export const NAV_RENTALS = [
  { name: 'Order by Date', href: '/order-by-date' },
  { name: 'Browse All Rentals', href: '/category' },
  { separator: true },
  { name: 'Weddings', href: '/weddings' },
  { name: 'Tent Rentals', href: '/category/tent-rentals' },
  { name: 'Table & Chair Rentals', href: '/category/table-chair-rentals' },
  { name: 'Linen Rentals', href: '/category/linen-rentals' },
  { name: 'Dance Floor & Stage Rentals', href: '/category/dance-floor-stage-rentals' },
  { name: 'Bounce Houses & Inflatables', href: '/category/bounce-house-rentals' },
  { name: 'Concession Machine Rentals', href: '/category/concession-machine-rentals' },
  { name: 'Yard Game Rentals', href: '/category/yard-game-rentals' },
  { name: 'Event Lighting Rentals', href: '/category/event-lighting-rentals' },
  { name: 'Generator Rentals', href: '/category/generator-rentals' },
  { name: 'Photobooth Rentals', href: '/category/photobooth-rentals' },
  { name: 'Foam Party Machine Rentals', href: '/category/foam-party-machine-rentals' },
  { name: 'Inflatable Movie Screen Rentals', href: '/category/inflatable-movie-screen-rentals' },
  { name: 'Heater & Fan Rentals', href: '/category/heater-fan-rentals' },
  { name: 'Party Rental Packages', href: '/category/party-rental-packages' },
  { name: 'Beverage & Food Service', href: '/category/beverage-food-service' },
  { name: 'Party Rental Accessories', href: '/category/party-rental-accessories' },
]

export const REVIEWS = [
  { author: 'Larissa B.', rating: 5, text: 'This company was easy to work with and the tent was fantastic. We even had a Tornado Watch the day after they put the tent up, and I was so nervous, but it stayed in place!' },
  { author: 'M C', rating: 5, text: 'Excellent services! Highly recommend - I needed something quick for a bday party- my daughter recommended him last minute so I messaged Jacob & he answered in a timely manner, came out the same day.' },
  { author: 'Jennie Karoleski', rating: 5, text: 'This was our first time hiring Friendly Party Rentals and everything went very smoothly. We ordered 24 of the Resin chairs with pads and 2 tables.' },
  { author: 'Angela Radakovich', rating: 5, text: 'Working with Friendly Party Rental to rent some chairs for our graduation party was very easy... even though we live out of town.' },
  { author: 'Lainie Cox', rating: 5, text: 'We used them for a big graduation party at Syracuse this past weekend and they were so amazing and easy to work with!!!' },
  { author: 'Mary McCormick', rating: 5, text: 'Excellent service and communication. Would highly recommend' },
]
