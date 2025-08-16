import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AuthUser } from '../types/auth'

interface AuthState {
  // State
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  lastVisitedPath: string

  // Actions
  setAuth: (token: string, user: AuthUser) => void
  clearAuth: () => void
  updateUser: (user: Partial<AuthUser>) => void
  setLastVisitedPath: (path: string) => void
  clearLastVisitedPath: () => void

  // Computed
  getAuthHeaders: () => Record<string, string>
  getRedirectPath: () => string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      user: null,
      isAuthenticated: false,
      lastVisitedPath: "/",

      // Actions
      setAuth: (token: string, user: AuthUser) => {
        set({
          token,
          user,
          isAuthenticated: true,
        })
      },

      clearAuth: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },

      updateUser: (userData: Partial<AuthUser>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          })
        }
      },

      // Computed getter for auth headers
      getAuthHeaders: () => {
        const token = get().token
        return {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      },
      setLastVisitedPath: (path: string) => {
        const authPages = ['/login', '/register']
        if (!authPages.includes(path)) {
          set({ lastVisitedPath: path })
        }
      },

      clearLastVisitedPath: () => {
        set({ lastVisitedPath: "/" })
      },

      // Get redirect path after login
      getRedirectPath: () => {
        const lastPath = get().lastVisitedPath
        console.log('🔍 getRedirectPath - Last visited path:', lastPath);

        return lastPath
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lastVisitedPath: state.lastVisitedPath
      }),
    }
  )
)