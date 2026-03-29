"use client";

import Image from "next/image";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore, { type WindowEntry } from "@store/window";

type ImgFileData = {
  name: string;
  imageUrl: string;
};

const ImgFile = () => {
  const { windows } = useWindowStore();
  const { data } = windows.imgfile as WindowEntry;
  const imgData = data as ImgFileData | null;

  return (
    <>
      <div id="window-header" className="relative">
        <WindowControls target="imgfile" disableMaximize />
        <h2>{imgData?.name ?? "image.png"}</h2>
      </div>

      <div className="imgfile-content max-h-fit bg-white dark:bg-gray-900">
        {imgData?.imageUrl && (
          <Image
            src={imgData.imageUrl}
            alt={imgData.name ?? "image"}
            width={800}
            height={600}
            className="max-w-full max-h-full w-auto h-auto object-contain object-center rounded-sm dark:outline-gray-700 outline-gray-300"
          />
        )}
      </div>
    </>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile", {
  resetDimensionsOnDataChange: true,
});

export default ImgFileWindow;
