"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import { getBanner } from "@lib/terminal/commands";
import useWindowStore from "@store/window";
import useTerminalStore from "@store/terminal";
import { History, Input } from "./terminal/index";
import clsx from "clsx";

const Terminal = () => {
  const { maximizeWindow, windows } = useWindowStore();
  const {
    history,
    visibleHistoryStartIndex,
    addHistoryEntry,
    showConfetti,
  } = useTerminalStore();
  const [confettiBounds, setConfettiBounds] = useState({ width: 0, height: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitiated = useRef(false);

  const { isOpen, isMinimized, isMaximized } = windows.terminal;

  useEffect(() => {
    if (!hasInitiated.current && history.length === 0) {
      hasInitiated.current = true;
      addHistoryEntry("", getBanner());
    }
  }, [history.length, addHistoryEntry]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = setTimeout(
        () => inputRef.current?.focus({ preventScroll: true }),
        150,
      );
      return () => clearTimeout(timer);
    } else if (!isOpen) {
      hasInitiated.current = false;
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (showConfetti) {
      const el = document.getElementById("terminal");
      if (el) {
        const rect = el.getBoundingClientRect();
        setConfettiBounds({ width: rect.width, height: rect.height });
      }
    }
  }, [showConfetti]);

  return (
    <div className="relative w-full h-full overflow-visible">
      {showConfetti && confettiBounds.width > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          <Confetti
            width={confettiBounds.width}
            height={confettiBounds.height}
            numberOfPieces={150}
            recycle={false}
            confettiSource={{
              x: 0,
              y: confettiBounds.height / 2 - 20,
              w: 15,
              h: 40,
            }}
            initialVelocityX={{ min: 5, max: 15 }}
          />
          <Confetti
            width={confettiBounds.width}
            height={confettiBounds.height}
            numberOfPieces={150}
            recycle={false}
            confettiSource={{
              x: confettiBounds.width - 15,
              y: confettiBounds.height / 2 - 20,
              w: 15,
              h: 40,
            }}
            initialVelocityX={{ min: -15, max: -5 }}
          />
        </div>
      )}
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("terminal")}
      >
        <WindowControls target="terminal" />
        <h2>Terminal</h2>
      </div>

      <div
        ref={containerRef}
        className={clsx(
          "terminal-body",
          isMaximized
            ? "max-h-[calc(100%-45px)] min-h-[calc(100%-45px)]"
            : "max-h-[65dvh] min-h-[65dvh]",
        )}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <History history={history.slice(visibleHistoryStartIndex)} />
        <Input inputRef={inputRef} containerRef={containerRef} />
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
