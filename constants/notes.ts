export const notesConstants = {
  VIEW: 0,
  CREATE: 1,
  EDIT: 2,

  TITLE_LENGHT: 16,

  // Character limits
  MAX_TITLE_LENGTH: 100,
  MAX_CONTENT_LENGTH: 50000,
  MAX_TAG_NAME: 30,
  MAX_TAGS_PER_NOTE: 10,
  MAX_EMOJI: 10,

  // Recommended lengths (for warnings)
  RECOMMENDED_TITLE_LENGTH: 100,
  RECOMMENDED_CONTENT_LENGTH: 10000,

  // Validation messages
  ERRORS: {
    TITLE_REQUIRED: 'Title is required',
    TITLE_TOO_SHORT: 'Title must be at least 1 character',
    TITLE_TOO_LONG: 'Title must be less than 200 characters',
    CONTENT_TOO_LONG: 'Content must be less than 50,000 characters',
    MAX_TAGS_EXCEEDED: 'Maximum 10 tags per note',
    MAX_EMOJI_EXCEEDED: 'Emoji must be less than 10 characters',
  },

  WARNINGS: {
    TITLE_APPROACHING_LIMIT: 'Title is getting long',
    CONTENT_APPROACHING_LIMIT: 'Content is getting long',
  }
} 