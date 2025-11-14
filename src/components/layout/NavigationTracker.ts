"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useNavigationStore } from '@/src/stores/navigationStore'

export function NavigationTracker() {
  const pathname = usePathname()
  const setPath = useNavigationStore((state) => state.setPath)

  useEffect(() => {
    setPath(pathname)
  }, [pathname, setPath])

  return null
}