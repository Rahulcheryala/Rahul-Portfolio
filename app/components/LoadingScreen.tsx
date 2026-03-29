"use client";

import { useState, useEffect, type ReactNode } from "react";
import { MetallicPaint } from "@components/react-bits";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    let minTimePassed = false;
    let pageLoaded = document.readyState === "complete";

    const tryFadeOut = () => {
      if (minTimePassed && pageLoaded) setFadeOut(true);
    };

    const timer = setTimeout(() => {
      minTimePassed = true;
      tryFadeOut();
    }, 1500);

    const onLoad = () => {
      pageLoaded = true;
      tryFadeOut();
    };

    if (pageLoaded) {
      tryFadeOut();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center transition-opacity duration-700 ${
            isDark ? "bg-black" : "bg-white"
          } ${fadeOut ? "opacity-0" : "opacity-100"}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="h-64 w-64 sm:h-80 sm:w-80">
            <MetallicPaint
              imageSrc="/apple-logo.svg"
              speed={0.4}
              scale={3}
              liquid={0.8}
              brightness={isDark ? 2 : 1.5}
              contrast={0.6}
              fresnel={1.2}
              lightColor={isDark ? "#ffffff" : "#333333"}
              darkColor={isDark ? "#111111" : "#e0e0e0"}
              tintColor={isDark ? "#feb3ff" : "#a78bfa"}
            />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default LoadingScreen;
