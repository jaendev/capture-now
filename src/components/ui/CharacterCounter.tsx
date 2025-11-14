interface CharacterCounterProps {
  current: number
  max: number
  label?: string
  showPercentage?: boolean
}

export function CharacterCounter({
  current,
  max,
  label = 'characters',
  showPercentage = false
}: CharacterCounterProps) {
  const percentage = (current / max) * 100

  const getColorClass = () => {
    if (percentage >= 100) return 'text-red-500 font-semibold'
    if (percentage >= 90) return 'text-orange-500 font-semibold'
    if (percentage >= 75) return 'text-yellow-500'
    return 'text-muted'
  }

  return (
    <div className={`text-xs ${getColorClass()}`}>
      <span>{current.toLocaleString()}</span>
      <span className="mx-1">/</span>
      <span>{max.toLocaleString()}</span>
      <span className="ml-1">{label}</span>
      {showPercentage && percentage > 50 && (
        <span className="ml-2">({percentage.toFixed(0)}%)</span>
      )}
    </div>
  )
}