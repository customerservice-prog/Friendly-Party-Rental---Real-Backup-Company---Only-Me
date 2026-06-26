import Link from 'next/link'

const settingsSections = [
  {
    title: 'General Config',
    items: ['Company Info', 'Time Zone', 'Routing Settings', 'Google Integration', 'QuickBooks Online', 'Mailchimp', 'AWeber', 'Constant Contact', 'Text Messaging', 'Text Logs', 'TaxCloud', 'Misc Settings', 'API Info', 'Users', 'System Setup', 'System Settings', 'Locations', 'Company Types', 'Company Roles', 'HighLevel Connect'],
  },
  {
    title: 'Order Config',
    items: ['Reminders', 'Order Options', 'References', 'Setup Surfaces', 'Coupons', 'Service Areas', 'Closed Dates', 'Misc Order Settings', 'Loyalty & Credit Types'],
  },
  {
    title: 'Documents',
    items: ['General Documents', 'Source Code', 'Setup Surveys', 'Automatic Messages', 'Automatic Text Messaging', 'Text Message Templates', 'Email Templates for Orders', 'Email Templates for Marketing', 'ERSMail', 'Contract Options'],
  },
  {
    title: 'Products',
    items: ['Categories', 'Items', 'Sorting', 'Schedule Profiles', 'Bulk Pricing', 'Addons', 'Product Sharing', 'Cost of Goods', 'Register Setup', 'Auto Charge', 'Capital Advance', 'Recurring Profiles'],
  },
  {
    title: 'Rules',
    items: ['Adjustments', 'Deposit Rules', 'Price Rule Sets', 'Availability Rule Sets'],
  },
  {
    title: 'Website',
    items: ['Website Pages', 'General Images', 'Gallery', 'Navigation Editor', 'Premium Features', 'Responsive Editor', 'WordPress Setup', 'Conversion Booster'],
  },
]

const workingLinks: Record<string, string> = {
  'Company Info': '/admin/settings/company-info',
  'Users': '/admin/settings/users',
  'Service Areas': '/admin/settings/service-areas',
  'Closed Dates': '/admin/settings/closed-dates',
  'Coupons': '/admin/settings/coupons',
  'Deposit Rules': '/admin/settings/deposit-rules',
  'Categories': '/admin/categories',
  'Items': '/admin/items',
  'Gallery': '/gallery',
}

export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Settings</h1>
      <div className="space-y-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-white rounded shadow">
            <div className="bg-admin-dark text-white px-4 py-2 font-medium text-sm">{section.title}</div>
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {section.items.map((item) => (
                workingLinks[item] ? (
                  <Link key={item} href={workingLinks[item]} className="text-sm text-secondary hover:underline py-1">
                    {item}
                  </Link>
                ) : (
                  <span key={item} className="text-sm text-body py-1">{item}</span>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
