"use client";

import { CheckIcon, Flag } from "lucide-react";

import { techStack } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import { WindowControls } from "@components";
import useWindowStore from "@store/window";

const Terminal = () => {
  const { maximizeWindow } = useWindowStore();
  return (
    <>
      <div
        id="window-header"
        className="relative"
        onDoubleClick={() => maximizeWindow("terminal")}
      >
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@Rahul %</span> show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <CheckIcon className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((tech, index) => (
                  <li key={index}>
                    {tech}
                    {index < items.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <CheckIcon size={20} /> 5 of 5 loaded successfully (100%)
          </p>

          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time: 7ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
