"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore, { type WindowEntry } from "@store/window";
import { careerTimeline, careerCategories } from "@constants";

type TimelineEntry = (typeof careerTimeline)[number];

const Calendar = () => {
  const { maximizeWindow, windows } = useWindowStore();
  const calendarData = (windows.calendar as WindowEntry).data as {
    selectedEntryId?: number;
  } | null;

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry>(
    careerTimeline[0],
  );

  useEffect(() => {
    if (calendarData?.selectedEntryId) {
      const entry = careerTimeline.find(
        (e) => e.id === calendarData.selectedEntryId,
      );
      if (entry) {
        setSelectedEntry(entry);
        setActiveCategory("all");
      }
    }
  }, [calendarData]);

  const filtered =
    activeCategory === "all"
      ? careerTimeline
      : careerTimeline.filter((e) => e.type === activeCategory);

  return (
    <>
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("calendar")}
      >
        <WindowControls target="calendar" />
        <h2 className="font-bold text-sm text-center w-full select-none">
          Experience
        </h2>
      </div>

      <div className="calendar-body">
        {/* Left Sidebar */}
        <aside className="calendar-sidebar">
          <div className="mb-6 px-2">
            <h3 className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Curator
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold mt-1">
              Work History
            </p>
          </div>

          <ul className="space-y-1">
            {careerCategories.map(({ id, label, icon }) => (
              <li
                key={id}
                onClick={() => setActiveCategory(id)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors",
                  activeCategory === id
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                )}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center: Timeline */}
        <section className="calendar-timeline">
          <div className="h-12 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-left">
              Career Progression
            </h2>
          </div>

          <div className="timeline-scroll">
            <div className="timeline-line" />

            <div className="relative space-y-8">
              {filtered.map((entry, index) => (
                <div
                  key={entry.id}
                  className={clsx(
                    "timeline-entry",
                    index % 2 === 0 ? "left" : "right",
                    selectedEntry.id === entry.id && "selected",
                  )}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="timeline-year w-1/2">
                    <span
                      className="text-xl font-black"
                      style={{ color: entry.color }}
                    >
                      {entry.year}
                    </span>
                  </div>

                  <div
                    className="timeline-dot"
                    style={{ backgroundColor: entry.color }}
                  />

                  <div className="timeline-card-wrapper">
                    <div
                      className="timeline-card"
                      style={
                        {
                          borderLeftColor:
                            index % 2 === 0 ? entry.color : undefined,
                          borderRightColor:
                            index % 2 !== 0 ? entry.color : undefined,
                          "--tw-ring-color":
                            selectedEntry.id === entry.id
                              ? entry.color
                              : undefined,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: entry.color }}
                      >
                        {entry.type === "fulltime"
                          ? "Full-time"
                          : entry.type === "intern"
                            ? "Internship"
                            : "Education"}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {entry.title}
                      </h4>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: entry.color }}
                      >
                        {entry.company}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                        {entry.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Detail Pane */}
        <aside className="calendar-detail">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-12 rounded-full shrink-0"
              style={{ backgroundColor: selectedEntry.color }}
            />
            <div>
              <h3 className="text-base font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                {selectedEntry.title}
              </h3>
              <p
                className="text-sm font-semibold"
                style={{ color: selectedEntry.color }}
              >
                {selectedEntry.company}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
              <span>📅</span>
              <span>{selectedEntry.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
              <span>📍</span>
              <span>{selectedEntry.location}</span>
            </div>
          </div>

          {"clients" in selectedEntry && selectedEntry.clients
            ? selectedEntry.clients.map((client) => (
                <div key={client.name}>
                  <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                    Client: {client.name}
                  </h4>
                  <ul className="space-y-2">
                    {client.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: selectedEntry.color }}
                        />
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                          {a}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : "achievements" in selectedEntry &&
              selectedEntry.achievements && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedEntry.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: selectedEntry.color }}
                        />
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                          {a}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

          {selectedEntry.techStack.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedEntry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-[10px] font-bold text-gray-600 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

const CalendarWindow = WindowWrapper(Calendar, "calendar");

export default CalendarWindow;
