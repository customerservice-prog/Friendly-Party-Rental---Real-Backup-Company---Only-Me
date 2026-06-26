import Link from 'next/link'
import CategoryCard from '@/components/public/CategoryCard'
import ReviewCarousel from '@/components/public/ReviewCarousel'
import WeddingPackageCard from '@/components/public/WeddingPackageCard'
import { PUBLIC_CATEGORIES, WEDDING_PACKAGES } from '@/lib/utils'

export default function HomePage() {
  return (
  <div>
    {/* Hero Section */}
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        <div className="bg-teal-400 h-32 md:h-48" />
        <div className="bg-pink-400 h-32 md:h-48" />
        <div className="bg-green-400 h-32 md:h-48" />
        <div className="bg-orange-400 h-32 md:h-48" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
          <div className="bg-dark text-white rounded-full px-6 py-3 font-bold text-sm md:text-base shadow-lg">
            Clean & Event-Ready Equipment
          </div>
          <Link
            href="/order-by-date"
            className="bg-red-600 text-white rounded-full px-6 py-3 font-bold text-sm md:text-base shadow-lg hover:bg-red-700 border-2 border-primary"
          >
            CLICK HERE to Book
          </Link>
          <div className="bg-dark text-white rounded-full px-6 py-3 font-bold text-sm md:text-base shadow-lg">
            Safety First
          </div>
        </div>
      </div>
    </section>

    {/* Intro Section */}
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-dark mb-6">
        Party Rentals in Syracuse, NY & Surrounding Areas
      </h1>
      <div className="space-y-4 text-body">
        <p>
          Friendly Party Rental provides reliable and affordable party rentals in Syracuse, NY, Minoa, and surrounding Central New York communities. We offer tent rentals, table and chair rentals, and event essentials for weddings, birthdays, graduations, and outdoor events.
        </p>
        <p>
          Based in Minoa, NY, we proudly serve the Syracuse area with clean equipment, on-time delivery, and friendly local service. We make event planning simple and stress-free.
        </p>
        <p>Browse our rental categories below to find everything you need for your event.</p>
        <p>
          Serving Syracuse, Minoa, Cicero, Manlius, Camillus, Baldwinsville, Clay, Cazenovia, Liverpool, and surrounding Central New York areas.
        </p>
      </div>
      <Link href="/order-by-date" className="btn-primary mt-8 inline-block">
        Book Your Party Rentals Online
      </Link>
    </section>

    {/* Value Props */}
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Local & Family-Owned',
            text: 'Based in Minoa, NY, we proudly serve Syracuse and surrounding Central New York communities with friendly, reliable local service you can trust.',
          },
          {
            title: 'Clean, Event-Ready Equipment',
            text: 'All of our party rental equipment is professionally cleaned, inspected, and ready to use so your event looks great and runs smoothly.',
          },
          {
            title: 'On-Time Delivery & Pickup',
            text: 'We show up when we say we will. Our team provides dependable delivery and pickup so you can focus on enjoying your event.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-lg shadow border border-primary/30">
            <div className="text-primary text-2xl mb-3">✓</div>
            <h3 className="font-bold text-dark mb-2">{item.title}</h3>
            <p className="text-body text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* YouTube Section */}
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-dark mb-6">Watch Us on YouTube</h2>
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed?listType=user_uploads&list=friendlypartyrental6272"
          title="Friendly Party Rental YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <Link href="/order-by-date" className="btn-primary inline-block">
        Book Your Rentals Online
      </Link>
    </section>

    {/* Category Grid */}
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-dark mb-8 text-center">Browse Our Rentals</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PUBLIC_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.slug} name={cat.name} href={cat.href} image={cat.image} />
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-primary/20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-dark mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold text-dark mb-2">Choose your rentals and event date</h3>
          </div>
          <div>
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-bold text-dark mb-2">Book online in minutes</h3>
          </div>
          <div>
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-dark mb-2">We deliver, set up, and pick up</h3>
          </div>
        </div>
      </div>
    </section>

  <ReviewCarousel />

    {/* SEO Sections */}
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-dark mb-3">Tent Rentals in Syracuse, NY</h2>
        <p className="text-body text-sm">
          From intimate backyard gatherings to large outdoor weddings, our pole tents come in sizes from 10x10 to 40x80. All tents include professional delivery, setup, and breakdown for most Onondaga County locations. Our tents are inspected and cleaned before every rental.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-dark mb-3">Table and Chair Rentals</h2>
        <p className="text-body text-sm">
          We offer white plastic folding chairs, resin chairs with pads, gold and white Chiavari chairs, 6ft and 8ft folding tables, and round banquet tables. Perfect for weddings, graduations, corporate events, and backyard parties throughout Syracuse and Central New York.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-dark mb-3">Bounce House Rentals</h2>
        <p className="text-body text-sm">
          Our commercial-grade bounce houses, water slides, and combo inflatables start at $199. All inflatables are cleaned and sanitized before every rental. Generator rentals available for park setups starting at $125.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-dark mb-3">Linens & Concession Rentals</h2>
        <p className="text-body text-sm">
          Complete your event with white table linens, napkins, and sashes. Add fun with our popcorn machines, cotton candy machines, snow cone machines, and other concession equipment rentals.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-dark mb-3">Wedding Rentals in Syracuse</h2>
        <p className="text-body text-sm">
          Our wedding packages include everything from intimate elopements to all-inclusive premium receptions. Packages include tents, tables, chairs, linens, dance floors, lighting, and professional setup and breakdown.
        </p>
      </div>
    </section>

    {/* Wedding Packages Preview */}
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-dark mb-2 text-center">Wedding Rental Packages</h2>
        <p className="text-body text-center mb-8">All packages include professional delivery, setup & breakdown. No hidden fees.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center mt-8">
          <Link href="/weddings" className="btn-primary inline-block">View All Wedding Packages</Link>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-dark mb-6 text-center">Why Choose Friendly Party Rental</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          'Family-owned business serving Central New York for 10+ years',
          '4.8-star Google rating with 90+ reviews',
          'Fully insured for your peace of mind',
          'Background-checked delivery and setup crews',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <p className="text-body">{item}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
  )
}
