import { create } from 'zustand'

interface NavigationState {
  currentPath: string
  previousPath: string | null
  setPath: (path: string) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPath: '/',
  previousPath: null,
  setPath: (path: string) =>
    set((state) => ({
      currentPath: path,
      previousPath: state.currentPath
    }))
}))