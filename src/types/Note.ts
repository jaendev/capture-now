import { Tag } from "./Tag"

export interface CreateNote {
  title: string
  content: string
  emoji?: string
  isFavorite?: boolean
  isArchived?: boolean
  tagIds: string[]
}

export interface CreateNoteDTO extends CreateNote {
  userId: string
}

export interface Note {
  id: string
  userId: string
  title: string
  content: string
  emoji?: string
  tags: Tag[]
  isFavorite: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Pagination {
  limit: number
  page: number
  total: number
  totalPages: number
}

export interface NotesResponse {
  notes: Note[]
  pagination: Pagination
}

export interface Notes {
  Notes: Note[]
  pagination: Pagination
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