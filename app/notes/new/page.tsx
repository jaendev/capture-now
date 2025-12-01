"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, X, SquarePen, Pen, Archive, BookHeart } from 'lucide-react'
import BreadCrumb from "@/src/components/layout/BreadCrumb"
import { MarkdownEditor } from "@/src/components/editor/MarkdownEditor"
import { ValidationMessage } from "@/src/components/ui/ValidationMessage"
import { CharacterCounter } from "@/src/components/ui/CharacterCounter"
import { useTags } from '@/src/hooks/useTags'
import { useNoteValidation } from '@/src/hooks/useNoteValidation'
import { CreateNote } from '@/src/types/Note'
import { createNote, updateNote, archiveNote, toggleFavoriteNote } from '@/src/services/noteService'
import { useNotes } from '@/src/hooks/useNotes'
import { paginationConsts } from '@/constants/pagination'
import { notesConstants } from '@/constants/notes'
import { useReload } from '@/src/hooks/useReload'

interface CreateNoteViewProps {
  id?: string
}

export default function CreateEditNoteView(noteId: CreateNoteViewProps) {
  const { note, refetch } = useNotes(paginationConsts.CURRENT_PAGE, paginationConsts.NOTES_PER_PAGE, noteId?.id)
  const { reload } = useReload()

  const [noteData, setNoteData] = useState<CreateNote>({
    title: '',
    content: '',
    tagIds: [],
  })

  const [currentTag, setCurrentTag] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isFavoriting, setIsFavoriting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

  const { tags } = useTags()
  const router = useRouter()

  // Validation
  const { errors, warnings, isValid } = useNoteValidation({
    title: noteData.title,
    content: noteData.content,
    tagIds: noteData.tagIds
  })

  const handleAddTag = (tagId: string) => {
    // Validate tag limit
    if (noteData.tagIds.length >= notesConstants.MAX_TAGS_PER_NOTE) {
      return
    }

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
    setSubmitAttempted(true)

    // Validate before saving
    if (!isValid) {
      return
    }

    setIsSaving(true)

    try {
      await createNote(noteData)
      router.push('/notes')
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = async () => {
    setSubmitAttempted(true)

    // Validate before updating
    if (!isValid) {
      return
    }

    setIsUpdating(true)

    try {
      const noteResponse = await updateNote(note?.id, noteData)
      router.push(`/notes/${noteResponse.id}`)
    } catch (error) {
      console.error('Error updating note:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleArchive = async () => {
    if (!note?.id) return

    setIsArchiving(true)
    try {
      await archiveNote(note.id)

      reload(refetch, 500)
    } catch (error) {
      console.error('Error archiving note:', error)
    } finally {
      setIsArchiving(false)
    }
  }

  const handleFavourite = async () => {
    if (!note?.id) return

    setIsFavoriting(true)
    try {
      await toggleFavoriteNote(note.id)

      reload(refetch, 500)
    } catch (error) {
      console.error('Error archiving note:', error)
    } finally {
      setIsFavoriting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  useEffect(() => {
    if (noteId.id) {
      setNoteData({
        title: note?.title ?? '',
        content: note?.content ?? '',
        tagIds: note?.tags?.map(t => t.id) ?? []
      })
      setIsEditMode(true)
    }
  }, [note?.content, note?.tags, note?.title, noteId.id])

  useEffect(() => {
    if (!noteId.id) {
      setIsEditing(true)
    }
  }, [noteId, isEditMode])

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
              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving || (submitAttempted && !isValid) || noteData.title.length == 0}
                className={`flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${noteId?.id ? 'hidden' : 'block'}`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save note</span>
                  </>
                )}
              </button>

              <button
                onClick={handleArchive}
                disabled={isEditing || isArchiving}
                className={`flex items-center space-x-2 bg-card hover:bg-hover border border-border text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${!noteId?.id ? 'hidden' : 'block'}`}
                title={note?.isArchived ? 'Unarchive note' : 'Archive note'}
              >
                {isArchiving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4" />
                    <span>{note?.isArchived ? 'Unarchive' : 'Archive'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleFavourite}
                disabled={isEditing || isFavoriting}
                className={`flex items-center space-x-2 bg-card hover:bg-hover border border-border text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${!noteId?.id ? 'hidden' : 'block'}`}
                title={note?.isFavorite ? 'Unfavorite note' : 'Favorite note'}
              >
                {isFavoriting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <BookHeart className="w-4 h-4" />
                    <span>{note?.isFavorite ? 'Unfavorite' : 'Favorite'}</span>
                  </>
                )}
              </button>

              {/* Update Button */}
              <button
                onClick={handleUpdate}
                disabled={isEditing || isUpdating || (submitAttempted && !isValid)}
                className={`flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${!noteId?.id ? 'hidden' : 'block'}`}
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update note</span>
                  </>
                )}
              </button>

              {/* Edit Toggle Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={noteData.title.length == 0}
                className={`flex items-center space-x-2 bg-gradient-primary hover:opacity-90 text-foreground px-4 py-2 rounded-lg font-medium transition-all
                  ${!noteId?.id ? 'hidden' : 'block'}`}
              >
                {isEditing && note?.id ? (
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

          {/* Validation Summary */}
          {submitAttempted && !isValid && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm font-semibold">
                ⚠️ Please fix the errors before saving
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="title" className="block text-sm font-medium text-foreground">
                  Title *
                </label>
                <CharacterCounter
                  current={noteData.title.length}
                  max={notesConstants.MAX_TITLE_LENGTH}
                  showPercentage
                />
              </div>
              <input
                id="title"
                type="text"
                disabled={!isEditing}
                value={noteData.title}
                onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter note title..."
                className={`w-full px-4 py-3 bg-card border rounded-lg text-foreground placeholder-muted focus:outline-none transition-colors
                  ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-border-focus'}
                `}
                maxLength={notesConstants.MAX_TITLE_LENGTH}
              />
              <ValidationMessage
                error={submitAttempted ? errors.title : undefined}
                warning={warnings.title}
              />
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                Tags ({noteData.tagIds.length}/{notesConstants.MAX_TAGS_PER_NOTE})
              </label>
              <div className="flex gap-2">
                <select
                  name="tagSelector"
                  id="tagSelector"
                  value={currentTag}
                  disabled={!isEditing || noteData.tagIds.length >= notesConstants.MAX_TAGS_PER_NOTE}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-border-focus transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>Select a tag</option>
                  {tags?.map((tag) => (
                    <option
                      value={tag.id}
                      key={tag.id}
                      disabled={noteData.tagIds.includes(tag.id)}
                    >
                      {tag.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleAddTag(currentTag)}
                  disabled={!currentTag || noteData.tagIds.includes(currentTag) || noteData.tagIds.length >= notesConstants.MAX_TAGS_PER_NOTE}
                  className="px-4 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              <ValidationMessage error={submitAttempted ? errors.tags : undefined} />

              {/* Selected Tags Display */}
              {noteData.tagIds.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {noteData.tagIds.map((tagId) => {
                    const tag = tags?.find(t => t.id === tagId);
                    if (!tag) return null;

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
                          className="hover:text-red-500 transition-colors disabled:cursor-not-allowed"
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Content
                </label>
                <CharacterCounter
                  current={noteData.content.length}
                  max={notesConstants.MAX_CONTENT_LENGTH}
                  showPercentage
                />
              </div>
              <MarkdownEditor
                value={noteData?.content || ''}
                onChange={(value) => {
                  // Prevenir que exceda el límite
                  if (value.length <= notesConstants.MAX_CONTENT_LENGTH) {
                    setNoteData(prev => ({ ...prev, content: value }))
                  }
                }}
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
                className={`min-h-[500px] ${errors.content ? 'border-red-500' : ''}`}
                editing={isEditing}
              />
              <ValidationMessage
                error={submitAttempted ? errors.content : undefined}
                warning={warnings.content}
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
                onClick={noteId?.id ? handleUpdate : handleSave}
                disabled={(noteId?.id ? isUpdating : isSaving) || (submitAttempted && !isValid)}
                className="flex-1 px-4 py-3 bg-gradient-primary hover:opacity-90 text-foreground rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(noteId?.id ? isUpdating : isSaving)
                  ? 'Saving...'
                  : noteId?.id ? 'Update Note' : 'Save Note'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}