"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

import { dockApps } from "@constants";
import useWindowStore, { type WindowEntry } from "@store/window";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const { openWindow, focusWindow, restoreMinimizedWindow, windows } =
    useWindowStore();

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } =
          icon.getBoundingClientRect();
        const iconCenter = iconLeft - left + iconWidth / 2;
        const distance = Math.abs(mouseX - iconCenter);
        const intensity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.25,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app: (typeof dockApps)[number]) => {
    if (!app.canOpen) return;

    const windowState = windows[app.id as keyof typeof windows];

    if (!windowState) {
      console.error(`Window ${app.id} not found`);
      return;
    }

    if (windowState.isOpen && (windowState as WindowEntry).isMinimized) {
      restoreMinimizedWindow(app.id as keyof typeof windows);
    } else if (
      windowState.isOpen &&
      !(windowState as WindowEntry).isMinimized
    ) {
      focusWindow(app.id as keyof typeof windows);
    } else if (!windowState.isOpen) {
      openWindow(app.id as keyof typeof windows);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-dock-app={app.id}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
            >
              <Image
                src={`/images/${app.icon}`}
                alt={app.name}
                width={56}
                height={56}
                unoptimized
                className={`object-cover object-center ${app.canOpen ? "cursor-pointer" : "cursor-default opacity-60"}`}
              />
              {windows[app.id as keyof typeof windows]?.isOpen && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-300 rounded-full" />
              )}
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
