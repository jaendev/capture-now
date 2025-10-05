'use client'

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function BreadCrumb() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; href: string }[]>([]);
  const path = usePathname();

  useEffect(() => {
    const pathSegments = path.split('/').filter(segment => segment);
    const breadcrumbItems = pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      return { name: segment, href };
    });
    setBreadcrumbItems(breadcrumbItems);
  }, [path]);

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