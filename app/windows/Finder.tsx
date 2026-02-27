"use client";

import { clsx } from "clsx";
import { Search } from "lucide-react";
import Image from "next/image";

import { WindowControls } from "@components";
import { locations } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import useLocationStore from "@store/location";
import useWindowStore, { WindowConfig } from "@store/window";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { maximizeWindow, openWindow } = useWindowStore();

  const renderList = (name: string, items: any) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item: any) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <Image src={item.icon} alt={item.name} width={16} height={16} />
            <p className="test-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const openItem = (item: any) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    // imgfile or txtfile
    openWindow(`${item.fileType as string}file` as keyof WindowConfig, item);
  };

  return (
    <>
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("finder")}
      >
        <WindowControls target="finder" />
        <span className="ms-auto p-1.5 rounded-full bg-white hover:bg-gray-100 cursor-pointer shadow-md">
          <Search size={16} />
        </span>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar select-none">
          {renderList("Favorites", Object.values(locations))}

          {renderList("Work", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item: any) => (
            <li
              key={item.id}
              className={item.position}
              onDoubleClick={() => openItem(item)}
            >
              <Image src={item.icon} alt={item.name} width={16} height={16} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
