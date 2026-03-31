"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TIP_SECTIONS } from "@constants";
import { Bell, Dice5, Eye, Lightbulb, MapPin, Sparkles, X } from "lucide-react";
import Image from "next/image";

type NotificationCenterProps = {
  isOpen: boolean;
  onClose: () => void;
};

const pickRandom = (items: readonly string[]) =>
  items[Math.floor(Math.random() * items.length)];

const TONE_CLASS_MAP = {
  warning: "notification-chip-warning",
  purple: "notification-chip-purple",
  neutral: "notification-chip-neutral",
} as const;

const ICON_MAP = {
  sparkles: Sparkles,
  eye: Eye,
  lightbulb: Lightbulb,
} as const;

const buildTips = () =>
  NOTIFICATION_TIP_SECTIONS.map((section) => ({
    ...section,
    text: pickRandom(NOTIFICATION_MESSAGES[section.messageKey]),
  }));

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTips, setSelectedTips] = useState(buildTips);

  const shuffleTips = useCallback(() => setSelectedTips(buildTips()), []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      shuffleTips();
      // Double rAF ensures the browser paints the off-screen state first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      return;
    }

    setIsVisible(false);
    const timeoutId = window.setTimeout(() => setIsMounted(false), 280);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen, shuffleTips]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <aside
      id="notification-center-root"
      className={clsx(
        "fixed inset-0 z-9999",
        isVisible ? "pointer-events-auto" : "pointer-events-none",
      )}
      onClick={onClose}
    >
      <div
        id="notification-center-panel"
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          "notification-center-panel",
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0",
        )}
      >
        <div className="notification-header">
          <h3 className="notification-title">Notification Center</h3>
          <button
            type="button"
            aria-label="Close notification center"
            onClick={onClose}
            className="notification-close"
          >
            <X size={12} />
          </button>
        </div>

        <div className="notification-body">
          <section className="notification-card">
            <div className="notification-card-header">
              <span className="notification-chip">
                <Bell size={12} />
                Analytics
              </span>
              <span className="notification-time">Just now</span>
            </div>
            <h4 className="notification-card-title">New Visitor Detected</h4>
            <p className="notification-copy">
              Someone just viewed this portfolio from{" "}
              <strong className="text-blue-600 dark:text-blue-400">
                San Francisco, CA
              </strong>
              .
            </p>
            <div className="notification-map">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src="/images/map-placeholder.png"
                alt="Map location"
                fill
              />
              <div className="notification-map-pin">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 relative z-10 shadow-lg" />
              </div>
              <div className="notification-map-overlay">
                <span className="text-[10px] text-white font-medium flex items-center gap-1">
                  <MapPin size={10} /> Local Session
                </span>
              </div>
            </div>
          </section>

          <span className="notification-did-you-know-title">DID YOU KNOW?</span>
          {selectedTips.map((tip) => {
            const Icon = ICON_MAP[tip.icon];
            return (
              <section key={tip.id} className="notification-card">
                <div className="notification-card-header">
                  <span
                    className={clsx(
                      "notification-chip",
                      TONE_CLASS_MAP[tip.tone],
                    )}
                  >
                    <Icon size={12} />
                    {tip.badge}
                  </span>
                </div>
                <h4 className="notification-card-title">{tip.title}</h4>
                <p className="notification-copy">{tip.text}</p>
              </section>
            );
          })}
        </div>

        <div className="notification-footer">
          <button
            type="button"
            className="notification-footer-btn"
            onClick={shuffleTips}
          >
            <Dice5 size={14} />
            Shuffle Tips
          </button>
        </div>
      </div>
    </aside>,
    document.body,
  );
};

export default NotificationCenter;
