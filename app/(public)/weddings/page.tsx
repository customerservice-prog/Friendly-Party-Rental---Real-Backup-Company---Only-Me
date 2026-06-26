import Link from 'next/link'
import WeddingPackageCard from '@/components/public/WeddingPackageCard'
import Accordion from '@/components/public/Accordion'
import { WEDDING_PACKAGES } from '@/lib/utils'

const faqItems = [
  {
    question: 'What is included in wedding rental packages?',
    answer: 'All packages include professional delivery, setup, and breakdown. Specific items vary by package — tents, tables, chairs, linens, lighting, and dance floors are included based on your chosen package level.',
  },
  {
    question: 'Can I customize a wedding package?',
    answer: 'Yes! We can customize any package to fit your specific needs. Call us at 315-884-1498 to discuss your vision and we will create a custom quote.',
  },
  {
    question: 'How far in advance should I book wedding rentals?',
    answer: 'We recommend booking 4-8 weeks in advance for summer weekends. Popular dates in peak season book quickly, so early booking ensures availability.',
  },
  {
    question: 'Do you deliver wedding rentals outside Syracuse?',
    answer: 'Yes, we serve Syracuse, Minoa, Cicero, Manlius, Camillus, Baldwinsville, Liverpool, and surrounding Central New York communities.',
  },
  {
    question: 'What if it rains on my wedding day?',
    answer: 'Our tents provide excellent weather protection. In case of severe weather, we work with you on contingency plans. Deposits are non-refundable but rainchecks are valid for one year.',
  },
]

export default function WeddingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-dark mb-3">Our Wedding Rental Packages</h1>
        <p className="text-body">All packages include professional delivery, setup & breakdown. No hidden fees.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {WEDDING_PACKAGES.map((pkg, idx) => (
          <WeddingPackageCard
            key={pkg.id}
            id={pkg.id}
            name={pkg.name}
            price={pkg.price}
            guests={pkg.guests}
            items={pkg.items}
            popular={pkg.popular}
            signature={'signature' in pkg && pkg.signature}
            packageNumber={idx + 1}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-dark mb-4">Full Wedding Rental Services</h2>
          <p className="text-body mb-4">
            Friendly Party Rental is your one-stop shop for wedding rentals in Syracuse and Central New York. From intimate backyard ceremonies to grand estate receptions, we provide everything you need to create the perfect wedding day.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-dark mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {['Seating', 'Linens', 'Ceremony Decor', 'Lighting', 'Backdrops', 'Tents & Dance Floors'].map((item) => (
              <div key={item} className="bg-primary/10 p-4 rounded-lg text-center font-medium text-dark">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-dark mb-4">Why Syracuse Couples Choose Us</h2>
          <ul className="space-y-2 text-body">
            <li>✓ Family-owned with 10+ years of wedding experience</li>
            <li>✓ 4.8-star Google rating from happy couples</li>
            <li>✓ Fully insured and background-checked crews</li>
            <li>✓ Clean, professionally maintained equipment</li>
            <li>✓ Flexible packages that fit any budget</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-dark mb-4">Wedding Rental FAQ</h2>
          <Accordion items={faqItems} />
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact_us" className="btn-primary inline-block">
          Request a Custom Quote
        </Link>
      </div>
    </div>
  )
}
