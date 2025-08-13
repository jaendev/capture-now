"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/src/stores/authStore'

export function NavigationTracker() {
  const pathname = usePathname()
  const { setLastVisitedPath, lastVisitedPath } = useAuthStore()


  console.log(`NavigationTracker: Current path is ${pathname}`);
  console.log(`NavigationTracker: Setting last visited path to ${lastVisitedPath}`);

  useEffect(() => {
    setLastVisitedPath(pathname)
  }, [pathname, setLastVisitedPath])

  return null
}