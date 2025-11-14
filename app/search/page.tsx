'use client'
import { Pagination } from '@/src/components/layout/Pagination';
import { SearchNotesSkeleton } from '@/src/components/skeletons/SearchNotesSkeleton';
import { useNotes } from '@/src/hooks/useNotes';
import { useAuthStore } from '@/src/stores/authStore';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { paginationConsts } from '@/constants/pagination';
import { notesConstants } from '@/constants/notes';
import { useNoteNavigation } from '@/src/hooks/useNoteNavigation';
import { getFirstLine } from '@/src/lib/string-utils';
import { MARKDOWN_CHARS } from '@/constants/markdown';
import { getDate, getTime } from '@/src/lib/date-time';

export default function SearchPage() {
  const { isAuthenticated } = useAuthStore()
  const { navigateByAction } = useNoteNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(paginationConsts.CURRENT_PAGE);
  const [cantOfNotes, setCantOfNotes] = useState(paginationConsts.NOTES_PER_PAGE_SEARCH);
  const router = useRouter()
  const path = usePathname();
  const { setLastVisitedPath } = useAuthStore();

  const { notes, pagination, loading } = useNotes(currentPage, paginationConsts.NOTES_PER_PAGE_SEARCH)

  const filteredResults = searchQuery
    ? notes.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : notes;

  useEffect(() => {
    setLastVisitedPath(path)
  }, [isAuthenticated, router, setLastVisitedPath, path]);

  useEffect(() => {

    if (filteredResults.length > 0) {
      setCantOfNotes(filteredResults.length);
    } else {
      setCantOfNotes(notes.length);
    }

  }, [filteredResults, notes]);

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
        <div className="px-4">
          {searchQuery && (
            <div className="text-sm text-muted">
              Found {filteredResults.length} results for &quot;{searchQuery}&quot;
            </div>
          )}

          {loading ? (
            <SearchNotesSkeleton cantNotes={cantOfNotes} />
          ) : (
            <>
              <div className={`text-sm text-muted ${searchQuery ? 'hidden' : ''}`}>
                Found {notes.length} results in total
              </div>

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {filteredResults.map((result) => (
                  <div key={result.id} className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                      <h3 className="text-accent font-semibold text-base md:text-lg">{result.title}</h3>
                      <span className="relative group">
                        <span className="text-muted text-xs md:text-sm font-mono cursor-help">
                          {getTime(result.createdAt)}
                        </span>

                        {/* Tooltip */}
                        <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-surface border border-border text-foreground text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                          {/* Tooltip date */}
                          {getDate(result.createdAt)}
                          <span className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-border"></span>
                        </span>
                      </span>
                    </div>

                    <p className="text-foreground mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">
                      {getFirstLine(result.content, MARKDOWN_CHARS)}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex gap-2 flex-wrap">
                        {result.tags.length > 0 && result.tags ? (
                          result.tags.map((tag) => (
                            <span key={tag.id}
                              className="px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                              style={{
                                backgroundColor: `${tag.color}30`,
                                color: tag.color
                              }}>
                              {tag.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted text-xs italic">No tags</span>
                        )}
                      </div>
                      <button
                        onClick={() => navigateByAction(notesConstants.EDIT, result.id)}
                        className="text-muted hover:text-accent transition-colors text-sm self-start sm:self-center cursor-pointer">
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {filteredResults.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted mx-auto mb-4" />
              <p className="text-muted text-sm md:text-base">No notes found for &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
