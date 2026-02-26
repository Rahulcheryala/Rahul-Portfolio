"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WindowControls } from "@components";
import { blogPosts } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const Safari = () => {
  const { maximizeWindow } = useWindowStore();
  return (
    <>
      <div
        id="window-header"
        className="pl-16 relative"
        onDoubleClick={() => maximizeWindow("safari")}
      >
        <WindowControls target="safari" />

        <PanelLeft size={16} className="ml-10" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or entire website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Journey as a Dev</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, date, title, link }) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <Image src={image} alt={title} width={100} height={100} />
              </div>
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  Checkout the full post
                  <ArrowRight className="icon-hover" size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
