interface ComicBookBackgroundProps {
  children: React.ReactNode
  className?: string
}

const panels = [
  { color: '#00BCD4' },
  { color: '#E91E8C' },
  { color: '#4CAF50' },
  { color: '#FF9800' },
]

export default function ComicBookBackground({ children, className = '' }: ComicBookBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 absolute inset-0">
        {panels.map((panel) => (
          <div
            key={panel.color}
            className="h-full w-full"
            style={{
              backgroundColor: panel.color,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '10px 10px',
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
