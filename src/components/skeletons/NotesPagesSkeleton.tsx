import { Skeleton } from "@/src/components/ui/Skeleton"

export function NotesPageSkeleton() {
  return (
    <div className="p-4 md:p-6">
      {/* Hero Section Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          {/* Title Skeleton */}
          <div className="mb-4 px-4">
            <Skeleton className="h-12 md:h-20 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-12 md:h-20 w-1/2 mx-auto" />
          </div>
          {/* Subtitle Skeleton */}
          <div className="px-4">
            <Skeleton className="h-6 md:h-8 w-2/3 mx-auto mb-2" />
            <Skeleton className="h-6 md:h-8 w-1/2 mx-auto" />
          </div>
        </div>

        {/* Quick Note Input Skeleton */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Icon Skeleton */}
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />

              <div className="flex-1 w-full">
                {/* Textarea Skeleton */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-3 sm:space-y-0">
                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-12 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  {/* Button Skeleton */}
                  <Skeleton className="h-10 w-full sm:w-20 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Notes Title Skeleton */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-12 md:h-16 w-48 mx-auto" />
        </div>

        {/* Notes Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 md:p-6">
              {/* Note Header Skeleton */}
              <div className="flex items-start justify-between mb-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Note Content Skeleton */}
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Note Footer Skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
              {/* Stat Number Skeleton */}
              <Skeleton className="h-8 md:h-10 w-8 mx-auto mb-2" />
              {/* Stat Label Skeleton */}
              <Skeleton className="h-3 md:h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}