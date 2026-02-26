"use client";

import { gsap, Draggable } from "gsap/all";
import type { Draggable as DraggableType } from "gsap/all";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef } from "react";

import { WINDOW_CONFIG } from "@constants";
import useWindowStore, { WindowEntry } from "@store/window";

const WindowWrapper = (
  Component: React.ComponentType<any>,
  windowKey: keyof typeof WINDOW_CONFIG,
) => {
  const WrapperComponent = (props: any) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMaximized, isMinimized, zIndex } = windows[
      windowKey
    ] as WindowEntry;
    const ref = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<DraggableType | null>(null);
    const preMaximizeRef = useRef<{
      width: number;
      height: number;
      top: number;
      left: number;
    } | null>(null);
    const preMinimizeRef = useRef<{
      width: number;
      height: number;
      top: number;
      left: number;
    } | null>(null);

    useGSAP(() => {
      const window = ref.current;
      if (!window) return;

      window.style.display = "block";

      const saved = preMaximizeRef.current;
      if (saved) {
        gsap.set(window, {
          left: saved.left,
          top: saved.top,
          width: saved.width,
          height: saved.height,
          x: 0,
          y: 0,
        });
        gsap.fromTo(
          window,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
        );
      } else {
        gsap.fromTo(
          window,
          { scale: 0.8, opacity: 0, y: 80 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
        );
      }
    }, [isOpen]);

    useGSAP(() => {
      const window = ref.current;
      if (!window) return;

      gsap.registerPlugin(Draggable);
      const header = window.querySelector<HTMLElement>("#window-header");

      const updateSavedPosition = () => {
        const parent = window.parentElement;
        if (!parent) return;
        const rect = window.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        preMaximizeRef.current = {
          width: rect.width,
          height: rect.height,
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
        };
      };

      const [instance] = Draggable.create(window, {
        handle: header ?? undefined,
        onPress: () => focusWindow(windowKey),
        onDragEnd: updateSavedPosition,
      });
      draggableRef.current = instance;

      return () => {
        instance.kill();
        draggableRef.current = null;
      };
    }, []);

    useGSAP(() => {
      const window = ref.current;
      const parent = window?.parentElement;
      const instance = draggableRef.current;

      if (!window || !parent) return;

      if (isMaximized) {
        instance?.disable();
        const rect = window.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        preMaximizeRef.current = {
          width: rect.width,
          height: rect.height,
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
        };

        gsap.to(window, {
          width: parent.offsetWidth,
          height: parent.offsetHeight - (40 + 89), // 40 is the spacing for the NAV and 89 is the spacing for the DOCK
          top: 40,
          left: 0,
          x: 0,
          y: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        const saved = preMaximizeRef.current;
        instance?.enable();

        if (saved) {
          gsap.to(window, {
            width: saved.width,
            height: saved.height,
            top: saved.top,
            left: saved.left,
            x: 0,
            y: 0,
            right: "auto",
            bottom: "auto",
            overflow: "",
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          gsap.set(window, {
            clearProps: "width,height,x,y,top,left,right,bottom,overflow",
          });
        }
      }
    }, [isMaximized]);

    useGSAP(() => {
      const window = ref.current;
      const parent = window?.parentElement;
      const instance = draggableRef.current;

      if (!window || !parent) return;

      const getDockIconRect = () => {
        const icon = document.querySelector(
          `#dock [data-dock-app="${windowKey}"]`,
        ) as HTMLElement | null;
        return icon?.getBoundingClientRect() ?? null;
      };

      if (isMinimized) {
        instance?.disable();
        const rect = window.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        preMinimizeRef.current = {
          width: rect.width,
          height: rect.height,
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
        };

        const iconRect = getDockIconRect();
        if (iconRect) {
          const parentRect2 = parent.getBoundingClientRect();
          const iconCenterX =
            iconRect.left - parentRect2.left + iconRect.width / 2;
          const iconCenterY =
            iconRect.top - parentRect2.top + iconRect.height / 2;
          const targetLeft = iconCenterX - rect.width / 2;
          const targetTop = iconCenterY - rect.height / 2;

          gsap.to(window, {
            left: targetLeft,
            top: targetTop,
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              (window as HTMLElement).style.pointerEvents = "none";
            },
          });
        } else {
          gsap.to(window, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              (window as HTMLElement).style.pointerEvents = "none";
            },
          });
        }
      } else {
        (window as HTMLElement).style.pointerEvents = "";
        instance?.enable();
        const saved = preMinimizeRef.current;
        const iconRect = getDockIconRect();

        if (saved) {
          if (iconRect) {
            const parentRect2 = parent.getBoundingClientRect();
            const iconCenterX =
              iconRect.left - parentRect2.left + iconRect.width / 2;
            const iconCenterY =
              iconRect.top - parentRect2.top + iconRect.height / 2;
            const startLeft = iconCenterX - saved.width / 2;
            const startTop = iconCenterY - saved.height / 2;

            gsap.fromTo(
              window,
              {
                left: startLeft,
                top: startTop,
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
              },
              {
                left: saved.left,
                top: saved.top,
                width: saved.width,
                height: saved.height,
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                overwrite: true,
              },
            );
          } else {
            gsap.to(window, {
              left: saved.left,
              top: saved.top,
              width: saved.width,
              height: saved.height,
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          }
        } else {
          gsap.to(window, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            overwrite: true,
          });
        }
      }
    }, [isMinimized, windowKey]);

    useLayoutEffect(() => {
      const window = ref.current;
      if (!window) return;

      window.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };
  WrapperComponent.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return WrapperComponent;
};

export default WindowWrapper;
