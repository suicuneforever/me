import { create } from 'zustand';

export interface Position {
  top: string;
  left: string;
}

export interface Window {
  id: string;
  title: string;
  position: Position;
}

interface WindowState {
  windows: Window[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, position: Position) => void;
  setActiveWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  closeAll: () => void;
}

export const useWindowStore = create<WindowState>()((set, get) => ({
  windows: [{ id: 'ABOUT_ME', title: 'about me', position: { top: '5rem', left: '15rem' } }],
  activeWindowId: 'ABOUT_ME',
  openWindow: (id, title, position) =>
    set((state) => ({
      windows: state.windows.find((w) => w.id === id) ? state.windows : [...state.windows, { id, title, position }],
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
