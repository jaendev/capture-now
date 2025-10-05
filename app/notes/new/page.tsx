"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, X } from 'lucide-react'
import BreadCrumb from "@/src/components/layout/BreadCrumb"
import { MarkdownEditor } from "@/src/components/editor/MarkdownEditor"
import { useAuthStore } from '@/src/stores/authStore'
import { useTags } from '@/src/hooks/useTags'

export default function NoteNewPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTag, setSelectedTag] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const { token } = useAuthStore()
  const { tags } = useTags()
  const router = useRouter()

  const handleAddTag = (tagId: string) => {
    if (tagId && !selectedTag.includes(tagId)) {
      setSelectedTag([...selectedTag, tagId])
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagId: string) => {
    setSelectedTag(selectedTag.filter(id => id !== tagId))
  }

  const handleSave = async () => {
    setIsSaving(true)
    console.log('Saving note with data:', { title, content, tagsId: selectedTag });

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tagIds: selectedTag }),
      })

      console.log('Response:', response);

      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to notes list after saving
      // router.push('/notes')
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="h-full bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border bg-surface">
          <BreadCrumb />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 text-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Create New Note
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving || !title.trim()}
                className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex gap-2">
                <select
                  name="tagSelector"
                  id="tagSelector"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors"
                >
                  <option value="" disabled>Select a tag</option>
                  {tags?.map((tag) => (
                    <option value={tag.id} key={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleAddTag(currentTag)}
                  disabled={!currentTag}
                  className="px-4 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Selected Tags Display */}
              {selectedTag.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedTag.map((tagId) => {
                    const tag = tags?.find(t => t.id === tagId);
                    return (
                      <span
                        key={tagId}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-foreground rounded-full"
                      >
                        {tag?.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tagId)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Type your note content here... 
                You can use markdown formatting:
                # Heading 1
                ## Heading 2
                **Bold text**
                *Italic text*
                - Bullet points
                1. Numbered lists
                - [ ] Task lists
                `code`
                [links](url)"
                className="min-h-[500px]"
              />
            </div>

            {/* Save Actions (Mobile) */}
            <div className="md:hidden flex space-x-3 pt-4 border-t border-border">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 text-foreground bg-surface hover:bg-hover border border-border rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !title.trim()}
                className="flex-1 px-4 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}