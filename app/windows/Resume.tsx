"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Link from "next/link";
import { Download } from "lucide-react";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  const { windows, maximizeWindow } = useWindowStore();
  return (
    <>
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("resume")}
      >
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <Link
          href="files/Rahul_resume_2025.pdf"
          download="files/Rahul_resume_2025.pdf"
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </Link>
      </div>

      <div className="resume-content">
        <Document file="files/Rahul_resume_2025.pdf">
          <Page
            className={`${windows.resume.isMaximized && "shadow-2xl mt-1 border border-gray-200 rounded-xl overflow-hidden"}`}
            pageNumber={1}
            scale={1.1}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
