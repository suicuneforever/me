import { create } from "zustand";
import { DESKTOP_WINDOWS } from "../constants/constants";
import { DesktopWindow } from "../types/types";

interface WindowState {
  windows: DesktopWindow[];
  activeWindowId: string | null;
  openWindow: (window: DesktopWindow) => void;
  setActiveWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  closeAll: () => void;
}

export const useWindowStore = create<WindowState>()((set, get) => ({
  windows: [DESKTOP_WINDOWS[0]],
  activeWindowId: "ABOUT_ME",
  openWindow: (window) =>
    set((state) => ({
      windows: state.windows.find((w) => w.id === window.id)
        ? state.windows
        : [...state.windows, window],
      activeWindowId: window.id,
    })),
  setActiveWindow: (id) => set({ activeWindowId: id }),
  closeWindow: (id) => {
    const { windows, activeWindowId } = get();
    const remainingWindows = windows.filter((w) => w.id !== id);

    let nextActiveId = activeWindowId;
    if (activeWindowId === id) {
      nextActiveId =
        remainingWindows.length > 0
          ? remainingWindows[remainingWindows.length - 1].id
          : null;
    }

    set({ windows: remainingWindows, activeWindowId: nextActiveId });
  },
  closeAll: () => set({ windows: [], activeWindowId: null }),
}));
