"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/src/stores/authStore'

export function NavigationTracker() {
  const pathname = usePathname()
  const { setLastVisitedPath, isAuthenticated, lastVisitedPath } = useAuthStore()

  useEffect(() => {
    console.log('🔍 NavigationTracker - Current path:', pathname)
    console.log('🔍 NavigationTracker - Is authenticated:', isAuthenticated)
    console.log('🔍 NavigationTracker - Current lastVisitedPath:', lastVisitedPath)

    // Track the path
    setLastVisitedPath(pathname)

    // Check what was saved
    const newLastPath = useAuthStore.getState().lastVisitedPath
    console.log('💾 NavigationTracker - Saved path:', newLastPath)
  }, [pathname, setLastVisitedPath, isAuthenticated, lastVisitedPath])

  return null
}