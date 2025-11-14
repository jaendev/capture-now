
export interface NavigationItem {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}