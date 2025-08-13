"use client"

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'

interface ConditionalSidebarProps {
  children: ReactNode
}

export function ConditionalSidebar({ children }: ConditionalSidebarProps) {
  const pathname = usePathname()

  // Auth pages that shouldn't show sidebar
  const authPages = ['/login', '/register']
  const isAuthPage = authPages.includes(pathname)

  if (isAuthPage) {
    return (
      <main className="h-full">
        {children}
      </main>
    )
  }

  return (
    <div className="h-screen bg-background md:flex">
      <Sidebar />
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  )
}