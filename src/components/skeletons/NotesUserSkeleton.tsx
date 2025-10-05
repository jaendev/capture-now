
export function NotesUserSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-4 md:p-6 animate-pulse">
          {/* Title and time */}
          <div className="flex items-start justify-between mb-4">
            <div className="h-5 bg-border rounded w-32"></div>
            <div className="h-4 bg-border rounded w-12"></div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-border rounded w-full"></div>
            <div className="h-4 bg-border rounded w-5/6"></div>
            <div className="h-4 bg-border rounded w-4/6"></div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-border rounded-full w-20"></div>
          </div>

          {/* Tags and menu */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="h-6 bg-border rounded-full w-16"></div>
              <div className="h-6 bg-border rounded-full w-20"></div>
            </div>
            <div className="h-4 w-4 bg-border rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}