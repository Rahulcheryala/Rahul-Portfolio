"use client";

import Image from "next/image";
import clsx from "clsx";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore, { type WindowEntry } from "@store/window";

type TxtFileData = {
  name: string;
  subtitle?: string;
  image?: string;
  description?: string[];
};

const TxtFile = () => {
  const { windows, maximizeWindow } = useWindowStore();
  const { data, isMaximized } = windows.txtfile as WindowEntry;
  const txtData = data as TxtFileData | null;

  return (
    <>
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("txtfile")}
      >
        <WindowControls target="txtfile" />
        <h2>{txtData?.name ?? "Untitled.txt"}</h2>
      </div>

      <div
        className={clsx(
          "txtfile-content",
          isMaximized
            ? "h-[calc(100%-45px)] min-h-[calc(100%-45px)] flex flex-col lg:flex-row gap-8"
            : "max-h-[60dvh] flex flex-col gap-4",
        )}
      >
        {txtData?.image && (
          <div
            className={clsx(
              "txtfile-image",
              isMaximized && "lg:w-[42%] lg:shrink-0 lg:self-start",
            )}
          >
            {isMaximized ? (
              <Image
                src={txtData.image}
                alt={txtData.name}
                width={900}
                height={900}
                className="w-full h-auto max-h-[calc(100dvh-12rem)] object-contain object-center rounded-sm"
              />
            ) : (
              <Image
                src={txtData.image}
                alt={txtData.name}
                width={0}
                height={0}
                sizes="100%"
                className="w-full h-auto max-h-[42dvh] object-contain object-center rounded-sm"
              />
            )}
          </div>
        )}

        <div className="space-y-3 max-w-4xl min-w-0">
          {txtData?.subtitle && (
            <p className="txtfile-subtitle">{txtData.subtitle}</p>
          )}

          <div className="mx-auto space-y-3">
            {txtData?.description?.map((line, i) => (
              <p key={i} className="txtfile-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");

export default TxtFileWindow;
