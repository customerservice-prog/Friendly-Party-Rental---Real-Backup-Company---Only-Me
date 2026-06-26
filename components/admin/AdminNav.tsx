'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Home,
  Settings,
  Calendar,
  Users,
  Truck,
  BarChart2,
  Megaphone,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', icon: Home, label: 'Home' },
  { href: '/admin/settings', icon: Settings, label: 'Admin' },
  { href: '/admin/scheduling', icon: Calendar, label: 'Scheduling' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/delivery', icon: Truck, label: 'Delivery' },
  { href: '/admin/reports', icon: BarChart2, label: 'Reports' },
  { href: '/admin/marketing', icon: Megaphone, label: 'Marketing' },
  { href: '/admin/settings', icon: HelpCircle, label: 'Help' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const username = (session?.user as { username?: string })?.username || 'bryanp315'

  return (
    <header className="bg-admin-green text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <Link href="/admin" className="font-bold text-admin-gold mr-4 text-sm">
            Friendly Party Rental
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  'p-2 rounded hover:bg-admin-dark transition-colors',
                  active && 'bg-admin-dark'
                )}
                title={item.label}
              >
                <Icon size={20} />
              </Link>
            )
          })}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Signed in as {username} (Administrator)</span>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-1 hover:text-admin-gold"
          >
            <LogOut size={16} />
            Logout
          </button>
          <button className="bg-accent px-3 py-1 rounded text-sm font-medium hover:bg-orange-600">
            New UI
          </button>
        </div>
      </div>
    </header>
  )
}
