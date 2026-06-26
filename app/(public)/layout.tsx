import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import StickyBar from '@/components/public/StickyBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-20">{children}</main>
      <Footer />
      <StickyBar />
    </>
  )
}
