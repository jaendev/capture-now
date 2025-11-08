/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { getNotes } from "@/src/services/noteService";
import { Note, Pagination } from "@/src/types/Note";

export function useNotes(page: number = 1, limit: number = 9) {
  const [notes, setNotes] = useState<Note[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const startTime = Date.now() // Track start time

    const fetchNotes = async () => {
      try {
        setLoading(true)
        setError(null) // Reset error on new fetch


        const response = await getNotes(page, limit)

        if (response) {
          setNotes(response.notes);
          setPagination(response.pagination);
        }

        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(1000 - elapsedTime, 0) // Minimum 1 second

        // Wait for remaining time if needed
        await new Promise(resolve => setTimeout(resolve, remainingTime))

      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        console.error('Error fetching notes:', e)

        // Also apply minimum delay on error
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(1000 - elapsedTime, 0)
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      } finally {
        setLoading(false);
      }
    }

    fetchNotes()
  }, [page, limit]) // Page and limit to dependency array

  // Optional: Add manual refetch function
  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getNotes(page)

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

  return { notes, pagination, error, loading, refetch }
}