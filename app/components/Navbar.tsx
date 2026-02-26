"use client";

import dayjs from "dayjs";
import Image from "next/image";

import { navIcons, navLinks, WINDOW_CONFIG } from "@/constants";
import useWindowStore from "@store/window";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <Image
          src="/images/logo.svg"
          width={14}
          height={14}
          alt="logo"
          className="mb-0.5"
        />
        <p className="font-bold">Rahul's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => openWindow(type as keyof typeof WINDOW_CONFIG)}
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img, name }) => (
            <li key={id}>
              <Image
                src={img}
                className="icon-hover"
                alt={`${name}-icon`}
                width={16}
                height={16}
              />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd D MMM h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
