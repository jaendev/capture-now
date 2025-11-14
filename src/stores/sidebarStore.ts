import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  showLabels: boolean;
  isInitialized: boolean;
  toggleSidebar: () => void;
  initializeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      // Initial state
      isOpen: true,
      showLabels: true,
      isInitialized: false,

      // Initialize sidebar on app load
      initializeSidebar: () => {
        const { isOpen } = get();
        set({
          showLabels: isOpen, // Set labels based on current open state
          isInitialized: true
        });
      },

      // Actions
      toggleSidebar: () => {
        const currentIsOpen = get().isOpen;
        const newIsOpen = !currentIsOpen;

        set({ isOpen: newIsOpen });

        if (newIsOpen) {
          // Show labels after sidebar expands (150ms delay)
          setTimeout(() => {
            set({ showLabels: true });
          }, 150);
        } else {
          // Hide labels immediately when closing
          set({ showLabels: false });
        }
      },
    }),
    {
      name: 'capture-now-sidebar',
      partialize: (state) => ({ isOpen: state.isOpen }),
    }
  )
);