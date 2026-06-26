import { BUSINESS } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-primary font-bold text-lg mb-2">Friendly Party Rental</h3>
            <p className="text-gray-300 text-sm">{BUSINESS.address}</p>
            <p className="text-gray-300 text-sm mt-1">
              <a href={`tel:${BUSINESS.phone}`} className="hover:text-primary">{BUSINESS.phone}</a>
            </p>
            <p className="text-gray-300 text-sm">
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary">{BUSINESS.email}</a>
            </p>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg mb-2">Hours</h3>
            <p className="text-gray-300 text-sm">{BUSINESS.hours}</p>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg mb-2">Service Area</h3>
            <p className="text-gray-300 text-sm">Serving {BUSINESS.serviceArea}</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          © {BUSINESS.legalName} All rights reserved
        </div>
      </div>
    </footer>
  )
}
