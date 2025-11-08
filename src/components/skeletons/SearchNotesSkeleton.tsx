interface SearchNotesSkeletonProps {
  cantNotes?: number;
}

export function SearchNotesSkeleton({ cantNotes = 6 }: SearchNotesSkeletonProps) {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">


        {/* Results Count Skeleton */}
        <div className="space-y-4 md:space-y-6 px-4">
          <div className="h-4 bg-border rounded w-40 animate-pulse"></div>

          {/* Note Cards Skeleton */}
          {Array.from({ length: cantNotes }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 md:p-6 animate-pulse">
              {/* Title and time */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <div className="h-6 md:h-7 bg-border rounded w-48"></div>
                <div className="h-4 md:h-5 bg-border rounded w-16"></div>
              </div>

              {/* Content preview */}
              <div className="space-y-2 mb-4">
                <div className="h-4 md:h-5 bg-border rounded w-full"></div>
                <div className="h-4 md:h-5 bg-border rounded w-4/5"></div>
              </div>

              {/* Tags and button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex gap-2 flex-wrap">
                  <div className="h-6 bg-border rounded w-16"></div>
                  <div className="h-6 bg-border rounded w-20"></div>
                  <div className="h-6 bg-border rounded w-14"></div>
                </div>
                <div className="h-5 bg-border rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}