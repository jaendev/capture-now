/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { getNotes } from "@/src/services/noteService";
import { Note, Pagination } from "@/src/types/Note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const response = await getNotes()

        if (response) {
          setNotes(response.notes);
          setPagination(response.pagination);
        }

      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        console.error('Error fetching notes:', e)
      } finally {
        setLoading(false);
      }
    }

    fetchNotes()
  }, [])

  return { notes, pagination, error, loading }
}