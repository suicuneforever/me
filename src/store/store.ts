import { create } from 'zustand';

interface WindowStackItem {
  id: string;
  data?: Record<string, any>;
}

interface WindowState {
  windows: WindowStackItem[];
  openWindow: (id: string, data?: Record<string, any>) => void;
  closeWindow: (id: string) => void;
  closeAll: () => void;
}

export const useWindowStore = create<WindowState>()((set) => ({
  windows: [],
  openWindow: (id, data) =>
    set((state) => ({
      windows: state.windows.some((window) => window.id === id) ? state.windows : [...state.windows, { id, data }],
    })),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),
  closeAll: () => set({ windows: [] }),
}));
