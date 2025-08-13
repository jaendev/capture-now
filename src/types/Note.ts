export interface CreateNoteDTO {
  userId: string
  title: string
  content: string
  emoji: string
  isFavorite?: boolean
  isArchived?: boolean
}

export interface UpdateNoteDTO {
  title?: string
  content?: string
  emoji?: string
  isFavorite?: boolean
  isArchived?: boolean
}

export interface GetUserNotes {
  page?: number
  limit?: number
  search?: string
  isFavorite?: boolean
  isArchived?: boolean
}