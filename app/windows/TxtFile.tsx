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
            ? "max-h-[calc(100%-45px)] min-h-[calc(100%-45px)]"
            : "max-h-[70dvh]",
        )}
      >
        {txtData?.image && (
          <div className="txtfile-image">
            {isMaximized ? (
              <Image
                src={txtData.image}
                alt={txtData.name}
                width={500}
                height={500}
                className="object-fit object-center rounded-sm"
              />
            ) : (
              <Image
                src={txtData.image}
                alt={txtData.name}
                width={0}
                height={0}
                sizes="100%"
                className="w-full h-auto object-cover object-center rounded-sm"
              />
            )}
          </div>
        )}

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
    </>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");

export default TxtFileWindow;
