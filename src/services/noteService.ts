import { apiClient } from "@/app/api/apiClient";
import { CreateNote, CreateNoteDTO, NotesResponse } from "../types/Note";

export const getNotes = (page: number = 1, limit: number = 9) => apiClient.get<NotesResponse>(`/notes?page=${page}&limit=${limit}`);
export const createNote = (data: CreateNote) => apiClient.post<CreateNote>("/notes", data)
