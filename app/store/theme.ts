import { create } from "zustand";

type ThemeStore = {
  isDark: boolean;
  initTheme: () => void;
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  isDark: false,
  initTheme: () => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", prefersDark);
    set({ isDark: prefersDark });
  },
  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return { isDark: next };
    }),
}));

export default useThemeStore;
