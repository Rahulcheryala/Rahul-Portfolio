"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import Image from "next/image";

import { navIcons, navLinks, WINDOW_CONFIG, locations } from "@/constants";
import useWindowStore from "@store/window";
import useLocationStore from "@store/location";
import useThemeStore from "@store/theme";
import Spotlight from "@components/Spotlight";
import { ShinyText, StarBorder } from "@components/react-bits";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const { toggleTheme, initTheme } = useThemeStore();

  const [time, setTime] = useState("");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);

  const userPopoverRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    initTheme();
    setIsFirstVisit(localStorage.getItem("theme") === null);
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

  useEffect(() => {
    if (!userPopoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        userPopoverRef.current &&
        !userPopoverRef.current.contains(e.target as Node) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target as Node)
      ) {
        setUserPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userPopoverOpen]);

  const gap = 4;
  const navH = 40;
  const topOffset = navH + gap;

  const handleSurpriseMe = () => {
    const projects = locations.work;
    const aboutTxt = locations.about.children.find(
      (c) => c.name === "about-me.txt",
    );

    if (aboutTxt) {
      openWindow("txtfile", aboutTxt, {
        top: topOffset,
        left: gap,
        height: `calc(70% - ${topOffset + gap * 0.5}px)`,
        width: "28rem",
      });
    }

    setActiveLocation(projects);
    openWindow("finder", undefined, {
      top: `calc(55% + ${gap * 0.5}px)`,
      left: gap,
      height: `calc(45% - ${gap * 1.5}px)`,
      width: "48rem",
    });

    // Top right: Terminal
    openWindow("terminal", undefined, {
      top: topOffset,
      left: `calc(100% - 48rem - ${gap}px)`,
      width: "48rem",
    });

    // Bottom right: Contact
    openWindow("contact", undefined, {
      top: `calc(50% - ${gap * 8.5}px)`,
      left: `calc(100% - 56rem - ${gap}px)`,
      width: "56rem",
    });

    // Center: Calendar (main attraction)
    openWindow("calendar", undefined, {
      top: `calc(${topOffset} + 1rem)`,
      left: `calc(50% - 36rem)`,
      width: "72rem",
    });

    setIsFirstVisit(false);
  };

  const getIconClickHandler = (name: string) => {
    switch (name) {
      case "Mode":
        return toggleTheme;
      case "Search":
        return () => setSpotlightOpen(true);
      case "User":
        return () => setUserPopoverOpen((prev) => !prev);
      default:
        return undefined;
    }
  };

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

      {isFirstVisit && (
        <StarBorder
          color="#f59e0b"
          speed="4s"
          thickness={1.5}
          className="max-sm:hidden"
          onClick={handleSurpriseMe}
        >
          <ShinyText
            text="✨ Surprise Me"
            speed={2.5}
            className="text-xs font-medium"
            color="#9ca3af"
            shineColor="#ffffff"
          />
        </StarBorder>
      )}

      <div>
        <ul>
          {navIcons.map(({ id, img, name }) => (
            <li
              key={id}
              ref={name === "User" ? userIconRef : undefined}
              onClick={getIconClickHandler(name)}
              className="cursor-pointer"
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

      {userPopoverOpen &&
        createPortal(
          <div ref={userPopoverRef} id="user-popover">
            <p>View my introduction?</p>
            <div className="popover-actions">
              <button onClick={() => setUserPopoverOpen(false)}>Cancel</button>
              <button
                className="confirm"
                onClick={() => {
                  setUserPopoverOpen(false);
                  handleSurpriseMe();
                }}
              >
                Show me
              </button>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
};

export default Navbar;
