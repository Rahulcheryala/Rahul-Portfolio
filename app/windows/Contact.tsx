"use client";

import Image from "next/image";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import { socials } from "@constants";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div id="window-header" className="relative">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <Image
          src="/images/adrian.jpg"
          alt="Adrian"
          width={120}
          height={120}
          className="rounded-full shadow"
        />

        <h3>Let's talk</h3>
        <p>
          I'm always looking for new opportunities and collaborations. Feel free
          to reach out to me.
        </p>
        <p className="text-sm text-gray-500 font-roboto">
          rahulcheryala787@gmail.com
        </p>

        <ul>
          {socials.map(({ id, link, icon, text, bg }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <Image src={icon} alt={text} width={20} height={20} />
                <p>{text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
