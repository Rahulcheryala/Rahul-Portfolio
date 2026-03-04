"use client";

import { useRef } from "react";
import useWindowStore from "@store/window";
import LazyResume from "./LazyResume";

/**
 * Renders LazyResume (and thus pdfjs/react-pdf) only when the resume window
 * is opened, deferring ~136 KB of PDF-related JS from the initial load.
 * Once mounted, stays mounted so reopening is instant.
 */
export default function ConditionalResume() {
  const { windows } = useWindowStore();
  const hasBeenOpened = useRef(false);

  if (windows.resume.isOpen) hasBeenOpened.current = true;
  if (!hasBeenOpened.current) return null;

  return <LazyResume />;
}
