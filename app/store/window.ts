import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type WindowConfig = typeof WINDOW_CONFIG;
type WindowEntry = {
  isOpen: boolean;
  zIndex: number;
  data: unknown;
  isMinimized?: boolean;
  isMaximized?: boolean;
};
type WindowState = {
  windows: WindowConfig;
  nextZIndex: number;
  openWindow: (windowKey: keyof WindowConfig, data?: unknown) => void;
  closeWindow: (windowKey: keyof WindowConfig) => void;
  focusWindow: (windowKey: keyof WindowConfig) => void;
  minimizeWindow: (windowKey: keyof WindowConfig) => void;
  restoreMinimizedWindow: (windowKey: keyof WindowConfig) => void;
  maximizeWindow: (windowKey: keyof WindowConfig) => void;
};

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.isOpen = true;
        window.zIndex = state.nextZIndex;
        window.data = data ?? window.data;
        state.nextZIndex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.isOpen = false;
        window.zIndex = INITIAL_Z_INDEX;
        window.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    minimizeWindow: (windowKey: keyof WindowConfig) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.isMinimized = true;
        window.zIndex = INITIAL_Z_INDEX;
      }),

    restoreMinimizedWindow: (windowKey: keyof WindowConfig) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.isMinimized = false;
      }),

    maximizeWindow: (windowKey: keyof WindowConfig) =>
      set((state) => {
        const window = state.windows[windowKey] as WindowEntry;
        if (!window) return;

        window.zIndex = state.nextZIndex;
        state.nextZIndex++;
        window.isMaximized = !window.isMaximized;
      }),
  })),
);

export default useWindowStore;
export type { WindowEntry, WindowConfig, WindowState };
