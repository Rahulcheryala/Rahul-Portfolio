"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import useWindowStore, { type WindowConfig } from "@store/window";
import { dockApps } from "@constants";

type SpotlightItem = {
  id: string;
  name: string;
  windowKey: keyof WindowConfig;
  icon: string;
};

const SPOTLIGHT_ITEMS: SpotlightItem[] = dockApps
  .filter((app) => app.canOpen)
  .map((app) => ({
    id: app.id,
    name: app.name,
    windowKey: app.id as keyof WindowConfig,
    icon: `/images/${app.icon}`,
  }));

const Spotlight = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindowStore();

  const filtered = query.trim()
    ? SPOTLIGHT_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase()),
      )
    : SPOTLIGHT_ITEMS;

  const exactMatch = query.trim()
    ? SPOTLIGHT_ITEMS.find(
        (item) =>
          item.name.toLowerCase() === query.trim().toLowerCase() ||
          item.id.toLowerCase() === query.trim().toLowerCase(),
      )
    : null;

  const handleSelect = useCallback(
    (item: SpotlightItem) => {
      openWindow(item.windowKey);
      setQuery("");
      onClose();
    },
    [openWindow, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
        return;
      }
      if (e.key === "Enter" && filtered.length > 0) {
        e.preventDefault();
        handleSelect(filtered[selectedIndex]);
        setSelectedIndex(0);
        setQuery("");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div id="spotlight-overlay" onClick={onClose}>
      <div id="spotlight" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-search">
          <Search size={20} strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            autoComplete="off"
            spellCheck={false}
          />
          {exactMatch && (
            <Image
              src={exactMatch.icon}
              alt={exactMatch.name}
              width={28}
              height={28}
              className="spotlight-match-icon"
              unoptimized
            />
          )}
        </div>

        {filtered.length > 0 && (
          <div className="spotlight-results">
            {filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={clsx(
                  "spotlight-item",
                  index === selectedIndex && "active",
                )}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  unoptimized
                />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 && query.trim() && (
          <div className="spotlight-empty">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Spotlight;
