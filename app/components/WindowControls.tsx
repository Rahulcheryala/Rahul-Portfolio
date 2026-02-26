import { WINDOW_CONFIG } from "@constants";
import useWindowStore from "@store/window";
import { ChevronsLeftRight, Minus, X } from "lucide-react";

const WindowControls = ({ target }: { target: string }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls" className="group">
      <div
        className="close"
        onClick={() => closeWindow(target as keyof typeof WINDOW_CONFIG)}
      >
        <span className="sr-only">Close</span>
        <X
          className="group-hover:block hidden text-gray-700"
          size={10}
          strokeWidth={3}
        />
      </div>
      <div
        className="minimize"
        onClick={() => minimizeWindow(target as keyof typeof WINDOW_CONFIG)}
      >
        <span className="sr-only">Minimize</span>
        <Minus
          className="group-hover:block hidden text-gray-700"
          size={10}
          strokeWidth={3}
        />
      </div>
      <div
        className="maximize"
        onClick={() => maximizeWindow(target as keyof typeof WINDOW_CONFIG)}
      >
        <span className="sr-only">Maximize</span>
        <ChevronsLeftRight
          className="group-hover:block hidden rotate-45 text-gray-700"
          size={10}
          strokeWidth={3}
        />
      </div>
    </div>
  );
};

export default WindowControls;
