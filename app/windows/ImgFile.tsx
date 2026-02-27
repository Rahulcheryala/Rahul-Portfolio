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
        <p className="text-center">{imgData?.name ?? "image.png"}</p>
      </div>

      <div className="preview h-fit">
        {imgData?.imageUrl && (
          <Image
            src={imgData.imageUrl}
            alt={imgData.name ?? "image"}
            width={0}
            height={0}
            sizes="100%"
            className="w-full h-auto max-h-[75vh] object-contain object-center rounded-sm"
          />
        )}
      </div>
    </>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");

export default ImgFileWindow;
