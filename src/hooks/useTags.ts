/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { Tag } from "../types/Tag";
import { getTags } from "../services/tagService";
import { useAuthStore } from "../stores/authStore";

export function useTags() {
  const { user } = useAuthStore()
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true)
        const response = await getTags()

        if (response) {
          setTags(response);
        }
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        console.error('Error fetching tags:', e)
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchTags()
    }
  }, [user?.id])

  return { tags, error, loading }
}