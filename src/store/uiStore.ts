import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isDesktopSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleDesktopSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isDesktopSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleDesktopSidebar: () => set((state) => ({ isDesktopSidebarCollapsed: !state.isDesktopSidebarCollapsed })),
}));
