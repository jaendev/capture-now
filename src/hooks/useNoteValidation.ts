import { useState, useEffect } from 'react'
import { notesConstants } from '@/constants/notes'

interface ValidationErrors {
  title?: string
  content?: string
  tags?: string
}

interface ValidationWarnings {
  title?: string
  content?: string
}

interface UseNoteValidationProps {
  title: string
  content: string
  tagIds: string[]
}

export function useNoteValidation({ title, content, tagIds }: UseNoteValidationProps) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [warnings, setWarnings] = useState<ValidationWarnings>({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const newErrors: ValidationErrors = {}
    const newWarnings: ValidationWarnings = {}

    // Validate Title
    if (!title || title.trim().length === 0) {
      newErrors.title = notesConstants.ERRORS.TITLE_REQUIRED
    } else if (title.length > notesConstants.MAX_TITLE_LENGTH) {
      newErrors.title = notesConstants.ERRORS.TITLE_TOO_LONG
    } else if (title.length > notesConstants.RECOMMENDED_TITLE_LENGTH) {
      newWarnings.title = notesConstants.WARNINGS.TITLE_APPROACHING_LIMIT
    }

    // Validate Content
    if (content.length > notesConstants.MAX_CONTENT_LENGTH) {
      newErrors.content = notesConstants.ERRORS.CONTENT_TOO_LONG
    } else if (content.length > notesConstants.RECOMMENDED_CONTENT_LENGTH) {
      newWarnings.content = notesConstants.WARNINGS.CONTENT_APPROACHING_LIMIT
    }

    // Validate Tags
    if (tagIds.length > notesConstants.MAX_TAGS_PER_NOTE) {
      newErrors.tags = notesConstants.ERRORS.MAX_TAGS_EXCEEDED
    }

    setErrors(newErrors)
    setWarnings(newWarnings)
    setIsValid(Object.keys(newErrors).length === 0)

  }, [title, content, tagIds])

  return {
    errors,
    warnings,
    isValid,
    hasErrors: Object.keys(errors).length > 0,
    hasWarnings: Object.keys(warnings).length > 0
  }
}