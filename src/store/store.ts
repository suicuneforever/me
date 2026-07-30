import { create } from 'zustand';

export interface Window {
  id: string;
  title: string;
}

interface WindowState {
  windows: Window[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string) => void;
  setActiveWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  closeAll: () => void;
}

export const useWindowStore = create<WindowState>()((set, get) => ({
  windows: [{ id: 'ABOUT_ME', title: 'about me' }],
  activeWindowId: 'ABOUT_ME',
  openWindow: (id, title) =>
    set((state) => ({
      windows: state.windows.find((w) => w.id === id) ? state.windows : [...state.windows, { id, title }],
      activeWindowId: id,
    })),
  setActiveWindow: (id) => set({ activeWindowId: id }),
  closeWindow: (id) => {
    const { windows, activeWindowId } = get();
    const remainingWindows = windows.filter((w) => w.id !== id);

    let nextActiveId = activeWindowId;
    if (activeWindowId === id) {
      nextActiveId = remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null;
    }

    set({ windows: remainingWindows, activeWindowId: nextActiveId });
  },
  closeAll: () => set({ windows: [], activeWindowId: null }),
}));
