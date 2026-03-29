"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";

import { navIcons, navLinks, WINDOW_CONFIG } from "@/constants";
import useWindowStore from "@store/window";
import useThemeStore from "@store/theme";
import Spotlight from "@components/Spotlight";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { toggleTheme, initTheme } = useThemeStore();
  const [time, setTime] = useState("");
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    const tick = () => setTime(dayjs().format("ddd D MMM h:mm A"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <nav>
      <div>
        <Image
          src="/images/logo.svg"
          width={14}
          height={14}
          alt="logo"
          className="mb-0.5 dark:invert"
        />
        <p className="font-bold dark:text-gray-200">Rahul&apos;s Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => openWindow(type as keyof typeof WINDOW_CONFIG)}
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img, name }) => (
            <li
              key={id}
              onClick={
                name === "Mode"
                  ? toggleTheme
                  : name === "Search"
                    ? () => setSpotlightOpen(true)
                    : undefined
              }
              className={
                name === "Mode" || name === "Search" ? "cursor-pointer" : ""
              }
            >
              <Image
                src={img}
                className="icon-hover dark:invert"
                alt={`${name}-icon`}
                width={16}
                height={16}
              />
            </li>
          ))}
        </ul>

        <time suppressHydrationWarning>{time}</time>
      </div>

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
