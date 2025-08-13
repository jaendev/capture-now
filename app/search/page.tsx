'use client'
import { useAuthStore } from '@/src/stores/authStore';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const { user, isAuthenticated } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter()


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const sampleResults = [
    {
      id: 1,
      title: "Project Ideas",
      content: "Need to work on the new dashboard design and implement user authentication...",
      tags: ["work", "projects"],
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Discussed the quarterly goals and upcoming product launches...",
      tags: ["meetings", "goals"],
      date: "1 day ago"
    },
    {
      id: 3,
      title: "Shopping List",
      content: "Groceries: milk, bread, eggs, coffee beans, vegetables...",
      tags: ["personal", "shopping"],
      date: "3 days ago"
    },
  ];

  const filteredResults = searchQuery
    ? sampleResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : sampleResults;

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Search Notes</h1>
          <p className="text-muted text-sm md:text-base">Find your notes quickly and efficiently</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6 md:mb-8 px-4">
          <div className="absolute inset-y-0 left-7 md:left-7 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors text-sm md:text-base"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results */}
        <div className="space-y-4 md:space-y-6 px-4">
          {searchQuery && (
            <div className="text-sm text-muted">
              Found {filteredResults.length} results for &quot;{searchQuery}&quot;
            </div>
          )}

          {filteredResults.map((result) => (
            <div key={result.id} className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <h3 className="text-accent font-semibold text-base md:text-lg">{result.title}</h3>
                <span className="text-muted text-xs md:text-sm self-start sm:self-center">{result.date}</span>
              </div>

              <p className="text-foreground mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">
                {result.content}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex gap-2 flex-wrap">
                  {result.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-muted hover:text-accent transition-colors text-sm self-start sm:self-center">
                  Open
                </button>
              </div>
            </div>
          ))}

          {filteredResults.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted mx-auto mb-4" />
              <p className="text-muted text-sm md:text-base">No notes found for &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
