"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { NotesPageSkeleton } from "@/src/components/skeletons/NotesPagesSkeleton"
import { useNotes } from "@/src/hooks/useNotes"
import { MARKDOWN_CHARS } from "@/constants/markdown"
import { getFirstLine } from "@/src/lib/string-utils"
import { notesConstants } from "@/constants/notes"
import { useNoteNavigation } from "@/src/hooks/useNoteNavigation"
import { useTags } from "@/src/hooks/useTags"

export default function NotesPage() {
  const { isAuthenticated } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  const { setLastVisitedPath } = useAuthStore();
  const path = usePathname();
  const router = useRouter()

  const { notes } = useNotes()
  const { tags } = useTags()
  const { navigateByAction } = useNoteNavigation();

  // Calculate stats
  const notesToday = notes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const today = new Date();
    return noteDate.toDateString() === today.toDateString();
  }).length;

  const notesThisMonth = notes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const today = new Date();
    return noteDate.getMonth() === today.getMonth() &&
      noteDate.getFullYear() === today.getFullYear();
  }).length;

  // Calculate consecutive days streak
  const calculateStreak = () => {
    if (notes.length === 0) return 0;

    const sortedNotes = [...notes].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const uniqueDates = Array.from(new Set(
      sortedNotes.map(note => new Date(note.createdAt).toDateString())
    ));

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);

      if (uniqueDates.includes(checkDate.toDateString())) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  useEffect(() => {
    setLastVisitedPath(path)
    setIsLoading(false)
  }, [isAuthenticated, router, setLastVisitedPath, path]);

  return (
    <div className="h-screen bg-background md:flex">
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {isLoading ? (
          <NotesPageSkeleton />
        ) : (
          <div className="p-4 md:p-6">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <div className="flex items-start mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-4 px-4">
                      Capture your ideas
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto px-4">
                      The fastest and most elegant way to save your daily thoughts
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-4 px-4">
                  Last notes
                </h1>
              </div>

              {/* Sample Notes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-accent font-semibold text-sm md:text-base">{note.title || '📝 Untitled Note'}</h3>
                      <span className="text-muted text-xs md:text-sm font-mono">{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
                      {getFirstLine(note.content, MARKDOWN_CHARS)}
                    </p>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {note.tags && note.tags.length > 0 ? (
                          note.tags.slice(0, 2).map((tag) => (
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
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4" >
                <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{notesToday}</div>
                  <div className="text-muted text-xs md:text-sm">Notes today</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary mb-2">{notesThisMonth}</div>
                  <div className="text-muted text-xs md:text-sm">Total this month</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-success mb-2">
                    {tags.length}
                  </div>
                  <div className="text-muted text-xs md:text-sm">Active tags</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-warning mb-2">{streak}</div>
                  <div className="text-muted text-xs md:text-sm">Days in a row</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}