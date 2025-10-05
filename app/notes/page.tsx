"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { useNotes } from "@/src/hooks/useNotes"
import { NotesUserSkeleton } from "@/src/components/skeletons/NotesUserSkeleton"

export default function NotesPage() {
  const { isAuthenticated } = useAuthStore()
  const { setLastVisitedPath } = useAuthStore();
  const path = usePathname();
  const router = useRouter()

  const { notes, pagination, loading, error } = useNotes()

  useEffect(() => {
    setLastVisitedPath(path)
  }, [isAuthenticated, router, setLastVisitedPath, path, notes, pagination]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="h-screen bg-background md:flex">
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header with logout */}
            <div className="mb-6 md:mb-8 px-4">
              <div className="flex items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Notes</h1>
                  <p className="text-muted text-sm">
                    {notes?.length || 0} notes found
                    {pagination && ` • Page ${pagination.page} of ${pagination.totalPages}`}
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <NotesUserSkeleton />
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
                      <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
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
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-wrap gap-2">
                          {note.tags && note.tags.length > 0 ? (
                            note.tags.slice(0, 3).map((tag) => ( // Show only the tree firts tags
                              <span
                                key={tag.id}
                                className="px-2 py-1 text-sm rounded-full font-medium"
                                style={{
                                  backgroundColor: `${tag.color}66`,
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
                        <button className="text-muted hover:text-accent transition-colors p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
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
          </div>
        </div>
      </main>
    </div>
  )
}