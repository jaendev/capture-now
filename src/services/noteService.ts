import { apiClient } from "@/app/api/apiClient";
import { NotesResponse } from "../types/Note";

export const getNotes = () => apiClient.get<NotesResponse>("/notes");
