import { FileText, Home, Search, Settings } from "lucide-react";

import { NavigationItem } from "@/src/types/Navigation";

export const navigation: NavigationItem[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/notes', icon: FileText, label: 'Notes' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];