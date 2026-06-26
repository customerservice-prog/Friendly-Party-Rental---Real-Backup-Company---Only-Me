import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/components/public/CartContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Friendly Party Rental | Party Rentals in Syracuse, NY',
  description:
    'Friendly Party Rental provides reliable and affordable party rentals in Syracuse, NY, Minoa, and surrounding Central New York communities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  )
}
