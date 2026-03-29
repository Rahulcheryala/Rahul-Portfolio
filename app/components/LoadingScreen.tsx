"use client";

import { useState, useEffect, type ReactNode } from "react";
import { MetallicPaint } from "@components/react-bits";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-black transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="h-64 w-64 sm:h-80 sm:w-80">
            <MetallicPaint
              imageSrc="/apple-logo.svg"
              speed={0.4}
              scale={3}
              liquid={0.8}
              brightness={2}
              contrast={0.6}
              fresnel={1.2}
              lightColor="#ffffff"
              darkColor="#111111"
              tintColor="#feb3ff"
            />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default LoadingScreen;
