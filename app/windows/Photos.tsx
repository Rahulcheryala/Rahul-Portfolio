"use client";

import { useState } from "react";
import clsx from "clsx";
import { Mail, Search } from "lucide-react";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";
import { gallery, photosLinks } from "@constants";
import Image from "next/image";

const Photos = () => {
  const [activeLinkId, setActiveLinkId] = useState(photosLinks[0]?.id ?? 1);
  const { maximizeWindow, openWindow, windows } = useWindowStore();

  return (
    <>
      <div
        id="window-header"
        className="relative flex-none"
        onDoubleClick={() => maximizeWindow("photos")}
      >
        <WindowControls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full h-[calc(100%-49px)]">
        <aside
          className={clsx(
            "sidebar",
            windows.photos.isMaximized ? "w-72" : "w-56",
          )}
        >
          <h2>Photos</h2>

          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveLinkId(id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && setActiveLinkId(id)
                }
                className={clsx(
                  "hover:bg-gray-100",
                  activeLinkId === id && "bg-blue-100 text-blue-700",
                )}
              >
                <Image src={icon} alt={title} width={16} height={16} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="gallery flex-1 min-h-0 overflow-auto">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 rounded-lg"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${id}`}
                  width={0}
                  height={0}
                  className="object-fit rounded-lg"
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
