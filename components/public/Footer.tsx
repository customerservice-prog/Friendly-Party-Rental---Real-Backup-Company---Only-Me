import { BUSINESS } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-6 mt-12">
      <div className="text-center text-sm">
        © {BUSINESS.legalName} All rights reserved
      </div>
    </footer>
  )
}
