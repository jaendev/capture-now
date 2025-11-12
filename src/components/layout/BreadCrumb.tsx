'use client'

import { useNavigationStore } from "@/src/stores/navigationStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function BreadCrumb() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; href: string }[]>([]);
  const path = usePathname();
  const { previousPath } = useNavigationStore()

  useEffect(() => {
    const items: { name: string; href: string }[] = []

    // 1. Add the previous path if it exists
    if (previousPath && previousPath !== path) {
      const previousSegments = previousPath.split('/').filter(segment => segment)

      // Add only the last segment of the previous path
      if (previousSegments.length > 0) {
        items.push({
          name: previousSegments[previousSegments.length - 1],
          href: previousPath
        })
      }
    }

    // 2. Add segments of the current path
    const pathSegments = path.split('/').filter(segment => segment)
    const currentItems = pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      return { name: segment, href }
    })

    // 3. Combine and remove duplicates by href
    const allItems = [...items, ...currentItems]
    const uniqueItems = allItems.filter((item, index, self) =>
      index === self.findIndex(t => t.href === item.href)
    )

    setBreadcrumbItems(uniqueItems)

  }, [path, previousPath])

  return (
    <nav className="flex-row px-2 pt-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent">
            Home
            <ChevronRight className="w-5 h-5 text-gray-400 mx-1 font-bold" />
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <li key={index} className="inline-flex items-center">
              <Link href={item.href} className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent">
                {item.name[0].toUpperCase() + item.name.slice(1).replace(/-/g, ' ')}
              </Link>
            </li>
            {index < breadcrumbItems.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-400 mx-1 font-bold" />
            )}
          </div>
        ))}
      </ol>
    </nav>
  )
}