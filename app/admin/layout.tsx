import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'
import { SessionProvider } from '@/components/admin/SessionProvider'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-100">
        {session && <AdminNav />}
        <main>{children}</main>
      </div>
    </SessionProvider>
  )
}
