export default function MarketingPage() {
  const templates = [
    'Order Confirmation Email',
    'Balance Reminder Email',
    'Delivery Reminder Email',
    'Pickup Reminder Email',
    'Thank You Email',
    'Quote Follow-up Email',
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-dark mb-6">Marketing</h1>
      <div className="bg-white rounded shadow p-6">
        <h2 className="font-bold text-dark mb-4">Email Templates</h2>
        <ul className="space-y-2">
          {templates.map((t) => (
            <li key={t} className="flex items-center justify-between border-b py-2 text-sm">
              <span>{t}</span>
              <button className="text-secondary text-xs hover:underline">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
