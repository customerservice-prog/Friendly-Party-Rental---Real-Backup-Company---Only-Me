'use client'

import Link from 'next/link'
import Image from 'next/image'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'

const LOGO_URL = 'https://files.sysers.com/cp/upload/315/editor/1.png'

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
    <header className="bg-[#2d6a2d] text-white border-b-4 border-[#4CAF50]">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <Link href="/admin" className="mr-3 flex-shrink-0">
            <Image
              src={LOGO_URL}
              alt="Friendly Party Rental"
              width={120}
              height={40}
              className="h-[40px] w-auto object-contain"
            />
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon
            const active =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  'p-2 rounded text-white hover:bg-[#1a3a1a] transition-colors',
                  active && 'bg-[#1a3a1a]'
                )}
                title={item.label}
              >
                <Icon size={20} />
              </Link>
            )
          })}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white">Signed in as {username} (Administrator)</span>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Logout
          </button>
          <button className="bg-[#E07B00] hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            New UI
          </button>
        </div>
      </div>
    </header>
  )
}
