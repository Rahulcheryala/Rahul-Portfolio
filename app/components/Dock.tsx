"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps } from "@constants";
import Image from "next/image";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

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

  const toggleApp = (app: (typeof dockApps)[number]) => {};

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
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
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
