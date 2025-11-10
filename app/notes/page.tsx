"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { useNotes } from "@/src/hooks/useNotes"
import { NotesUserSkeleton } from "@/src/components/skeletons/NotesUserSkeleton"
import { Pagination } from "@/src/components/layout/Pagination"
import { paginationConsts } from '@/constants/pagination';
import { notesConstants } from "@/constants/notes"
import { useNoteNavigation } from '@/src/hooks/useNoteNavigation';

export default function ViewNotesPage() {
  const { isAuthenticated } = useAuthStore()
  const { setLastVisitedPath } = useAuthStore();
  const path = usePathname();
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(paginationConsts.CURRENT_PAGE);

  const { notes, pagination, loading, error } = useNotes(currentPage, paginationConsts.NOTES_PER_PAGE)
  const { navigateByAction } = useNoteNavigation();

  useEffect(() => {
    setLastVisitedPath(path)
  }, [isAuthenticated, router, setLastVisitedPath, path]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="h-screen bg-background md:flex">
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8 px-4">
              <div className="flex items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Notes</h1>
                  <p className="text-muted text-sm">
                    {pagination?.total || 0} total notes found
                    {pagination && ` • Page ${currentPage} of ${pagination.totalPages}`}
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <NotesUserSkeleton cantNotes={notes.length} />
            ) : (
              <>
                {/* Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
                  {notes?.map((note) => (
                    <div key={note.id} className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-accent font-semibold text-sm md:text-base flex items-center gap-2">
                          {note.emoji && <span>{note.emoji}</span>}
                          {note.title}
                        </h3>
                        <span className="text-muted text-xs md:text-sm font-mono">
                          {new Date(note.createdAt).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed line-clamp-3">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-2">
                          {note.isFavorite && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs">
                              ⭐ Favorite
                            </span>
                          )}
                          {note.isArchived && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded text-xs">
                              📁 Archived
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {note.tags && note.tags.length > 0 ? (
                            note.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 text-xs rounded-full font-medium"
                                style={{
                                  backgroundColor: `${tag.color}33`,
                                  color: tag.color
                                }}
                              >
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted text-xs italic">No tags</span>
                          )}
                        </div>
                        <button
                          onClick={() => navigateByAction(notesConstants.EDIT, note.id)}
                          className="text-muted hover:text-accent transition-colors px-2 py-1 text-xs font-medium"
                        >
                          Open →
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Show message if no notes */}
                  {notes?.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted text-lg">No notes found</p>
                      <p className="text-muted text-sm">Create your first note to get started!</p>
                    </div>
                  )}
                </div>

              </>
            )}
            {/* Pagination */}
            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}