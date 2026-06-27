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

export const BUSINESS = {
  name: 'Friendly Party Rental',
  legalName: 'Friendly Party Rental L.L.C.',
  phone: '315-884-1498',
  text: '315-884-1498',
  email: 'customerservice@friendlypartyrental.com',
  address: '330 Costello Parkway',
  city: 'Minoa',
  state: 'NY',
  zip: '13116',
  fullAddress: '330 Costello Parkway, Minoa, NY 13116',
  serviceArea: 'Serving Syracuse & Nearby Cities',
  hours: 'Mon-Sat: 8am-6pm, Sun: By Appointment',
  facebook: 'https://www.facebook.com/friendlypartyrental',
  youtube: 'https://www.youtube.com/c/FriendlyPartyRental',
  yelp: 'https://www.yelp.com/biz/friendly-party-rental',
  instagram: 'https://www.instagram.com/friendlypartyrental',
  tiktok: '',
  twitter: '',
  mapUrl: 'https://maps.google.com/?q=330+Costello+Parkway+Minoa+NY+13116',
}

export const NAV_RENTALS = [
  { name: 'Order by Date', href: '/order-by-date' },
  { name: 'Weddings', href: '/weddings' },
  { name: 'Table & Chair Rentals', href: '/category/table-chair-rentals' },
  { name: 'Tent Rentals', href: '/category/tent-rentals' },
  { name: 'Dance Floor & Stage Rentals', href: '/category/dance-floor-stage-rentals' },
  { name: 'Party Rental Packages', href: '/category/party-rental-packages' },
  { name: 'Beverage & Food Service Rentals', href: '/category/beverage-food-service' },
  { name: 'Heater & Fan Rentals', href: '/category/heater-fan-rentals' },
  { name: 'Linen & Tablecloth Rentals', href: '/category/linen-rentals' },
  { name: 'Concession Machine Rentals', href: '/category/concession-machine-rentals' },
  { name: 'Yard Game Rentals', href: '/category/yard-game-rentals' },
  { name: 'Event Lighting Rentals', href: '/category/event-lighting-rentals' },
  { name: 'Generator Rentals', href: '/category/generator-rentals' },
  { name: 'Photobooth Rentals', href: '/category/photobooth-rentals' },
  { name: 'Foam Party Machine Rentals', href: '/category/foam-party-machine-rentals' },
  { name: 'Inflatable Movie Screen Rentals', href: '/category/inflatable-movie-screen-rentals' },
  { name: 'Bounce House Rentals', href: '/category/bounce-house-rentals' },
  { name: 'Party Rental Accessories', href: '/category/party-rental-accessories' },
]

export const REVIEWS = [
  { id: '1', author: 'Larissa B.', rating: 5, text: 'This company was easy to work with and the tent was fantastic. We even had a Tornado Watch the day after they put the tent up, and I was so nervous, but it stayed in place!', date: '2024-08-15' },
  { id: '2', author: 'M C', rating: 5, text: 'Excellent services! Highly recommend - I needed something quick for a bday party.', date: '2024-07-22' },
  { id: '3', author: 'Jennifer K.', rating: 5, text: 'We used Friendly Party Rental for our daughters graduation party. They were professional, on time, and the tent and tables looked great. Will definitely use again!', date: '2024-06-10' },
  { id: '4', author: 'Mike T.', rating: 5, text: 'Great experience from start to finish. They were responsive, delivered on time, and picked everything up promptly. Highly recommend for any outdoor event.', date: '2024-05-30' },
]

export const PUBLIC_CATEGORIES = [
  { slug: 'order-by-date', name: 'Order by Date', href: '/order-by-date', image: 'https://files.sysers.com/cp/upload/315/editor/med/NewOrderByDate.png' },
  { slug: 'weddings', name: 'Weddings', href: '/weddings', image: 'https://files.sysers.com/cp/upload/315/categories/med/victoria-grady_r-tagg-2546-2.jpg' },
  { slug: 'table-chair-rentals', name: 'Table & Chair Rentals - Syracuse, NY', href: '/category/table-chair-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_38_40-AM.png' },
  { slug: 'tent-rentals', name: 'Tent Rentals - Syracuse, NY', href: '/category/tent-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_38_16-AM.png' },
  { slug: 'dance-floor-stage-rentals', name: 'Dance Floor & Stage Rentals - Syracuse, NY', href: '/category/dance-floor-stage-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_41_14-AM.png' },
  { slug: 'party-rental-packages', name: 'Party Rental Packages - Syracuse, NY', href: '/category/party-rental-packages', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_39_22-AM.png' },
  { slug: 'beverage-food-service', name: 'Beverage & Food Service Rentals - Syracuse, NY', href: '/category/beverage-food-service', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_44_30-AM.png' },
  { slug: 'heater-fan-rentals', name: 'Heater & Fan Rentals - Syracuse, NY', href: '/category/heater-fan-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_47_00-AM.png' },
  { slug: 'linen-rentals', name: 'Linen & Tablecloth Rentals - Syracuse, NY', href: '/category/linen-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_05-AM.png' },
  { slug: 'concession-machine-rentals', name: 'Concession Machine Rentals - Syracuse, NY', href: '/category/concession-machine-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_42_03-AM.png' },
  { slug: 'yard-game-rentals', name: 'Yard Game Rentals - Syracuse, NY', href: '/category/yard-game-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_37_29-AM.png' },
  { slug: 'event-lighting-rentals', name: 'Event Lighting Rentals - Syracuse, NY', href: '/category/event-lighting-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_24-AM.png' },
  { slug: 'generator-rentals', name: 'Generator Rentals - Syracuse, NY', href: '/category/generator-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_40_58-AM.png' },
  { slug: 'photobooth-rentals', name: 'Photobooth Rentals - Syracuse, NY', href: '/category/photobooth-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_39_03-AM.png' },
  { slug: 'foam-party-machine-rentals', name: 'Foam Party Machine Rentals - Syracuse, NY', href: '/category/foam-party-machine-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_48_33-AM.png' },
  { slug: 'inflatable-movie-screen-rentals', name: 'Inflatable Movie Screen Rentals - Syracuse, NY', href: '/category/inflatable-movie-screen-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Dec-19--2025--10_49_44-AM.png' },
  { slug: 'bounce-house-rentals', name: 'Bounce House Rentals - Syracuse, NY', href: '/category/bounce-house-rentals', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Mar-10--2026--04_18_04-PM.png' },
  { slug: 'party-rental-accessories', name: 'Party Rental Accessories - Syracuse, NY', href: '/category/party-rental-accessories', image: 'https://files.sysers.com/cp/upload/315/categories/med/ChatGPT-Image-Jun-9--2026--05_10_38-AM.png' },
]

export const WEDDING_PACKAGES = [
  { id: 'pkg-1', name: 'Backyard Elopement', price: 345, guests: 30, popular: false, signature: false, items: ['Pole Tent (10x10 or 10x20)', 'Up to 4 Folding Tables', 'Up to 30 White Folding Chairs', 'White Table Linens', 'Delivery, Setup & Breakdown'] },
  { id: 'pkg-2', name: 'Classic Ceremony', price: 520, guests: 50, popular: false, signature: false, items: ['Pole Tent (10x20 or 20x20)', 'Up to 6 Folding Tables', 'Up to 50 White Folding Chairs', 'White Table Linens', 'Basic Centerpiece Accents', 'Delivery, Setup & Breakdown'] },
  { id: 'pkg-3', name: 'Garden Reception', price: 2380, guests: 100, popular: true, signature: false, items: ['Pole Tent (20x30 or 20x40)', 'Up to 10 Round Banquet Tables', 'Up to 100 Chiavari or Folding Chairs', 'Premium White/Ivory Linens', 'Decor & Centerpieces', 'Portable Dance Floor', 'String Lights/Uplighting', 'Delivery, Setup & Breakdown'] },
  { id: 'pkg-4', name: 'Luxury Estate', price: 5165, guests: 150, popular: false, signature: false, items: ['Large Pole Tent (40x60 or larger)', 'Up to 16 Round Banquet Tables', 'Up to 150 Chiavari Chairs (Gold or White)', 'Luxury Satin Linens & Napkins', 'Full Dance Floor & Cocktail Tables', 'Uplighting & Bistro String Lights', 'Delivery, Setup & Breakdown'] },
  { id: 'pkg-5', name: 'All-Inclusive Premium', price: 6925, guests: 200, popular: false, signature: true, items: ['Premium Pole Tent (40x80 or larger)', 'Up to 20 Round Banquet Tables', 'Up to 200 Chiavari Chairs (Gold or White)', 'Luxury Linens, Napkins & Sashes', 'Large Dance Floor & Cocktail Tables', 'Full Uplighting & Bistro String Lights', 'Portable Photo Booth & Generator', 'Delivery, Setup & Breakdown'] },
]
