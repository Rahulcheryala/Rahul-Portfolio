"use client";

import type { RefObject } from "react";
import { executeCommand } from "@lib/terminal/commands";
import {
  getTabCompletionSuggestion,
  handleTabCompletion,
} from "@lib/terminal/utils";
import useTerminalStore from "@store/terminal";
import { Prompt } from "./Prompt";
import { Spinner } from "./Spinner";

type InputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const Input = ({ inputRef, containerRef }: InputProps) => {
  const {
    command,
    history,
    lastCommandIndex,
    isExecuting,
    tabSuggestions,
    setCommand,
    setLastCommandIndex,
    setTabSuggestions,
    addHistoryEntry,
    clearHistory,
    clearScreen,
    setExecuting,
  } = useTerminalStore();

  const suggestion = getTabCompletionSuggestion(command);
  const commandsList = history
    .map((e) => e.command)
    .filter((c): c is string => Boolean(c));

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setCommand("");
      setLastCommandIndex(0);
      return;
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearHistory();
      setCommand("");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion(command, setCommand, setTabSuggestions);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      setLastCommandIndex(0);
      setTabSuggestions(null);
      await executeCommand(
        command,
        addHistoryEntry,
        () => setCommand(""),
        clearScreen,
        setExecuting,
      );
      containerRef.current?.scrollTo(
        0,
        containerRef.current?.scrollHeight + 16,
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandsList.length === 0) return;
      const idx = lastCommandIndex + 1;
      if (idx <= commandsList.length) {
        setLastCommandIndex(idx);
        setCommand(commandsList[commandsList.length - idx] ?? "");
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandsList.length === 0) return;
      const idx = lastCommandIndex - 1;
      if (idx > 0) {
        setLastCommandIndex(idx);
        setCommand(commandsList[commandsList.length - idx] ?? "");
      } else {
        setLastCommandIndex(0);
        setCommand("");
      }
    }
  };

  return (
    <>
      {tabSuggestions && tabSuggestions.length > 0 && (
        <div className="flex gap-2 items-baseline mb-1">
          <div className="shrink-0 w-0" aria-hidden />
          <span className="font-roboto text-sm text-gray-500">
            {tabSuggestions.join("  ")}
          </span>
        </div>
      )}

      <div className="flex gap-2 items-center relative">
        <div className="shrink-0">
          <Prompt />
        </div>

        <div className="flex items-baseline w-fit">
          <input
            ref={inputRef}
            type="text"
            size={Math.max(0, (command?.length ?? 0) + 0)}
            className="terminal-input bg-transparent font-roboto text-sm text-gray-700 caret-amber-500 focus:outline-none"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          {suggestion && (
            <span
              className="font-roboto text-sm text-gray-400 opacity-60 -ms-1"
              aria-hidden
            >
              {suggestion}
            </span>
          )}
        </div>

        {isExecuting && (
          <div className="absolute top-full left-0">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};
