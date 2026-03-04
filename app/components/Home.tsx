"use client";

import clsx from "clsx";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import gsap from "gsap";

import { locations } from "@constants";
import useWindowStore from "@store/window";
import useLocationStore from "@store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFolder = (project: any) => {
    setActiveLocation(project);
    openWindow("finder", project);
  };

  useGSAP(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create(".folder", { cursor: "default" });
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onDoubleClick={() => handleOpenProjectFolder(project)}
          >
            <Image
              src="/images/folder.png"
              alt={project.name}
              height={0}
              width={0}
              sizes="100%"
              className="w-full h-full object-cover"
            />
            <p className="max-w-32 line-clamp-2 break-after-all">
              {project.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
