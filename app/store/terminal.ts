import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type HistoryEntry = {
  id: number;
  date: Date;
  command: string;
  output: string;
};

type TerminalState = {
  history: HistoryEntry[];
  visibleHistoryStartIndex: number;
  command: string;
  lastCommandIndex: number;
  isExecuting: boolean;
  tabSuggestions: string[] | null;
  addHistoryEntry: (command: string, output: string) => void;
  clearHistory: () => void;
  clearScreen: () => void;
  setCommand: (value: string) => void;
  setLastCommandIndex: (index: number) => void;
  setExecuting: (v: boolean) => void;
  setTabSuggestions: (v: string[] | null) => void;
  resetTerminal: () => void;
  showConfetti: boolean;
  setShowConfetti: (v: boolean) => void;
};

const useTerminalStore = create<TerminalState>()(
  immer((set) => ({
    history: [],
    visibleHistoryStartIndex: 0,
    command: "",
    lastCommandIndex: 0,
    isExecuting: false,
    tabSuggestions: null,
    showConfetti: false,

    addHistoryEntry: (command, output) =>
      set((state) => {
        state.history.push({
          id: state.history.length,
          date: new Date(),
          command,
          output,
        });
      }),

    clearHistory: () =>
      set((state) => {
        state.history = [];
        state.visibleHistoryStartIndex = 0;
      }),

    clearScreen: () =>
      set((state) => {
        state.visibleHistoryStartIndex = state.history.length;
      }),

    setCommand: (value) =>
      set((state) => {
        state.command = value;
        state.tabSuggestions = null;
      }),

    setLastCommandIndex: (index) =>
      set((state) => {
        state.lastCommandIndex = index;
      }),

    setExecuting: (val) =>
      set((state) => {
        state.isExecuting = val;
      }),

    setTabSuggestions: (val) =>
      set((state) => {
        state.tabSuggestions = val;
      }),

    resetTerminal: () =>
      set((state) => {
        state.history = [];
        state.visibleHistoryStartIndex = 0;
        state.command = "";
        state.lastCommandIndex = 0;
        state.isExecuting = false;
        state.tabSuggestions = null;
        state.showConfetti = false;
      }),

    setShowConfetti: (val) =>
      set((state) => {
        state.showConfetti = val;
      }),
  })),
);

export default useTerminalStore;
export type { TerminalState, HistoryEntry };
