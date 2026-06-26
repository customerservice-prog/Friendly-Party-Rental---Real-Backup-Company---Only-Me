'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
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

const navItems = [
  { href: '/admin', icon: Home, label: 'Home' },
  { href: '/admin/settings', icon: Settings, label: 'Admin' },
  { href: '/admin/scheduling', icon: Calendar, label: 'Scheduling' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/delivery', icon: Truck, label: 'Delivery' },
  { href: '/admin/reports', icon: BarChart2, label: 'Reports' },
  { href: '/admin/marketing', icon: Megaphone, label: 'Marketing' },
  { href: '/admin/help', icon: HelpCircle, label: 'Help' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  const username = session?.user?.name || 'bryanp315'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16"
      style={{ backgroundColor: '#2d6a2d', borderBottom: '3px solid #4CAF50' }}>
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Image
            src="https://files.sysers.com/cp/upload/315/editor/1.png"
            alt="Friendly Party Rental"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            unoptimized
          />
        </Link>
      </div>
      <div className="flex items-center gap-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className="flex flex-col items-center px-3 py-1 rounded hover:bg-green-700 transition-colors"
              style={{ color: isActive ? '#f5c518' : 'white' }}
            >
              <Icon size={20} />
              <span className="text-xs mt-0.5">{label}</span>
            </Link>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white text-sm">
          Signed in as <strong>{username}</strong> (Administrator)
        </span>
        <button
          onClick={handleSignOut}
          className="px-3 py-1 text-sm rounded text-white hover:bg-green-700 border border-green-500"
        >
          Logout
        </button>
        <button
          className="px-3 py-1 text-sm rounded text-white font-semibold"
          style={{ backgroundColor: '#E07B00' }}
        >
          New UI
        </button>
      </div>
    </nav>
  )
}
