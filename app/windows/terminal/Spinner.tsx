"use client";

import { useEffect, useState } from "react";

/** Frames from nanospinner / cli-spinners - Unicode braille pattern spinner */
const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export const Spinner = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block shrink-0 text-amber-600 font-roboto text-2xl"
      aria-hidden
    >
      {FRAMES[frame]}
    </span>
  );
};
