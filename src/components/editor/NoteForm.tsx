"use client"

import { useState, FormEvent } from 'react'
import { Save, Tag, FileText } from 'lucide-react'
import { MarkdownEditor } from './MarkdownEditor'

interface NoteFormData {
  title: string
  content: string
  tags: string[]
}

interface NoteFormProps {
  initialData?: Partial<NoteFormData>
  onSave: (data: NoteFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function NoteForm({
  initialData = {},
  onSave,
  onCancel,
  isLoading = false
}: NoteFormProps) {
  const [title, setTitle] = useState(initialData.title || '')
  const [content, setContent] = useState(initialData.content || '')
  const [tagsInput, setTagsInput] = useState(initialData.tags?.join(', ') || '')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    await onSave({
      title: title.trim(),
      content,
      tags
    })
  }

  const isValid = title.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="flex items-center text-sm font-medium text-foreground mb-2">
          <FileText className="w-4 h-4 mr-2" />
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          disabled={isLoading}
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors disabled:opacity-50"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="flex items-center text-sm font-medium text-foreground mb-2">
          <Tag className="w-4 h-4 mr-2" />
          Tags
        </label>
        <input
          id="tags"
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="work, personal, ideas (comma separated)"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors disabled:opacity-50"
        />
        <p className="text-xs text-muted mt-1">
          Separate tags with commas
        </p>
      </div>

      {/* Tags Preview */}
      {tagsInput.trim() && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tag Preview
          </label>
          <div className="flex flex-wrap gap-2">
            {tagsInput.split(',').map((tag, index) => {
              const trimmedTag = tag.trim()
              return trimmedTag ? (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {trimmedTag}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Content
        </label>
        <MarkdownEditor
          value={content}
          onChange={setContent}
          editing={!isLoading}
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

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 md:flex-initial px-6 py-3 text-foreground bg-surface hover:bg-hover border border-border rounded-lg transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="flex-1 md:flex-initial px-6 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </>
          )}
        </button>
      </div>
    </form>
  )
}