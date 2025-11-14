interface ValidationMessageProps {
  error?: string
  warning?: string
  className?: string
}

export function ValidationMessage({ error, warning, className = '' }: ValidationMessageProps) {
  if (!error && !warning) return null

  return (
    <div className={`text-xs mt-1 ${className}`}>
      {error && (
        <p className="text-red-500 flex items-center gap-1">
          <span className="font-semibold">⚠️</span>
          {error}
        </p>
      )}
      {!error && warning && (
        <p className="text-yellow-500 flex items-center gap-1">
          <span className="font-semibold">⚡</span>
          {warning}
        </p>
      )}
    </div>
  )
}