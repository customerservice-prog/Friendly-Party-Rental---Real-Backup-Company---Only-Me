import Link from 'next/link'

const serviceAreas = [
  {
    region: 'Syracuse Metro',
    cities: [
      'Syracuse (13201-13215, 13219, 13224)',
      'Minoa (13116)',
      'East Syracuse (13057)',
      'DeWitt (13214)',
      'Manlius (13104)',
      'Fayetteville (13066)',
      'Chittenango (13037)',
      'Baldwinsville (13027)',
      'Liverpool (13088, 13090)',
      'Camillus (13031)',
      'Salina (13088)',
      'North Syracuse (13212)',
    ],
  },
  {
    region: 'Eastern Suburbs',
    cities: [
      'Cazenovia (13035)',
      'Canastota (13032)',
      'Oneida (13421)',
      'Bridgeport (13030)',
      'Kirkville (13082)',
      'Lyncourt (13212)',
      'Cicero (13039)',
      'Clay (13041)',
    ],
  },
  {
    region: 'Southern & Western',
    cities: [
      'Skaneateles (13152)',
      'Auburn (13021)',
      'Marcellus (13108)',
      'LaFayette (13084)',
      'Tully (13159)',
      'Jamesville (13078)',
      'Nedrow (13120)',
      'Onondaga Hill (13215)',
      'Westvale (13219)',
    ],
  },
  {
    region: 'Northern',
    cities: [
      'Oswego (13126)',
      'Fulton (13069)',
      'Phoenix (13135)',
      'Brewerton (13029)',
      'Central Square (13036)',
      'Lacona (13083)',
    ],
  },
]

export default function ServiceAreaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-dark mb-8 text-center">
        Party Rental Delivery Area — Syracuse, NY & Surrounding Cities
      </h1>

      <div className="space-y-8 mb-12">
        {serviceAreas.map((area) => (
          <div key={area.region}>
            <h2 className="text-xl font-bold text-dark mb-3 border-b border-primary pb-2">
              {area.region}
            </h2>
            <ul className="grid md:grid-cols-2 gap-2">
              {area.cities.map((city) => (
                <li key={city} className="text-body text-sm">{city}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/category/bounce-house-rentals" className="btn-primary">Browse Bounce Houses</Link>
        <Link href="/category/tent-rentals" className="btn-primary">Browse Tents</Link>
        <Link href="/order-by-date" className="btn-accent">Book Now</Link>
      </div>
    </div>
  )
}
