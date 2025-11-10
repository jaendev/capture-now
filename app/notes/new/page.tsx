"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, X, SquarePen, Pen } from 'lucide-react'
import BreadCrumb from "@/src/components/layout/BreadCrumb"
import { MarkdownEditor } from "@/src/components/editor/MarkdownEditor"
import { useTags } from '@/src/hooks/useTags'
import { CreateNote } from '@/src/types/Note'
import { createNote } from '@/src/services/noteService'
import { useNotes } from '@/src/hooks/useNotes'

interface CreateNoteViewProps {
  id?: string
}

export default function CreateEditNoteView(noteId: CreateNoteViewProps) {

  const { note } = useNotes(1, 9, noteId?.id)

  const [noteData, setNoteData] = useState<CreateNote>({
    title: '',
    content: '',
    tagIds: [],
  })

  const [currentTag, setCurrentTag] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { tags } = useTags()
  const router = useRouter()

  const isEditMode = !!noteId.id
  const buttonText = isEditMode ? 'Update Note' : 'Save Note'
  const loadingText = isEditMode ? 'Updating...' : 'Saving...'

  const handleAddTag = (tagId: string) => {
    if (tagId && !noteData?.tagIds.includes(tagId)) {
      setNoteData(prev => ({
        ...prev,
        tagIds: [...prev?.tagIds, tagId]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setNoteData(prev => ({
      ...prev,
      tagIds: prev.tagIds.filter(id => id !== tagId)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true)
    console.log('Saving note with data:', noteData);

    try {
      const response = await createNote(noteData)

      console.log(response);

      // Redirect to notes list after saving
      router.push('/notes')
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = async () => {
  }

  const handleAction = isEditMode ? handleUpdate : handleSave


  const handleCancel = () => {
    router.back()
  }

  useEffect(() => {
    if (noteId) {
      // Load note data into state for editing
      setNoteData({
        title: note?.title ?? '',
        content: note?.content ?? '',
        tagIds: note?.tags.map(t => t.id) ?? []
      })
    }
  }, [note?.content, note?.tags, note?.title, noteId])

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
                {noteId?.id ? (
                  <span>Edit Note</span>
                ) : (
                  <span>Create New Note</span>
                )}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAction}
                disabled={isSaving || !noteData.title.trim()}
                className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>{loadingText}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{buttonText}</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing && note ? (
                  <>
                    <Pen className="w-4 h-4" />
                    <span>Editing...</span>
                  </>
                ) : (
                  <>
                    <SquarePen className="w-4 h-4" />
                    <span>Edit note</span>
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
                disabled={!isEditing}
                defaultValue={noteData?.title}
                onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
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
                  disabled={!isEditing}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors"
                >
                  <option value="" disabled>Select a tag</option>
                  {tags?.map((tag) => (
                    <option
                      value={tag.id}
                      key={tag.id}
                      disabled={noteData.tagIds.includes(tag.id) && !isEditing}
                    >
                      {tag.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleAddTag(currentTag)}
                  disabled={!currentTag || noteData.tagIds.includes(currentTag)}
                  className="px-4 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Selected Tags Display */}
              {noteData.tagIds.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {noteData.tagIds.map((tagId) => {
                    const tag = tags?.find(t => t.id === tagId);

                    if (!tag) return null;  // If not found, do not show

                    return (
                      <span
                        key={tagId}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-foreground rounded-full"
                        style={{
                          backgroundColor: `${tag.color}33`,
                          color: tag.color
                        }}
                      >
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tagId)}
                          disabled={!isEditing}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted text-sm mt-3">No tags added yet</p>
              )}
            </div>

            {/* Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <MarkdownEditor
                value={noteData?.content || ''}
                onChange={(value) => setNoteData(prev => ({ ...prev, content: value }))}
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
                editing={isEditing}
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
                disabled={isSaving || !noteData.title.trim()}
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