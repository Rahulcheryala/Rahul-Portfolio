"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  Trash2,
  Reply,
  Forward,
  Send,
  Paperclip,
  Smile,
  AlignLeft,
  Inbox,
  FileText,
  ShieldAlert,
} from "lucide-react";
import clsx from "clsx";

import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";
import { socials } from "@constants";
import { sendEmail } from "@lib/send-email";

const MAILBOX_ITEMS = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 1 },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const Contact = () => {
  const { maximizeWindow } = useWindowStore();
  const [activeMailbox, setActiveMailbox] = useState("inbox");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const initialFormData = {
    from: "",
    cc: "",
    subject: "New Project Inquiry",
    body: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const updateField = (field: keyof typeof formData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSend = async () => {
    if (!formData.from.trim()) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!formData.subject.trim() && !formData.body.trim()) {
      setStatus({
        type: "error",
        message: "Please enter a subject or message.",
      });
      return;
    }

    setSending(true);
    setStatus(null);

    const result = await sendEmail(formData);

    setSending(false);
    if (result.success) {
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData(initialFormData);
    } else {
      setStatus({
        type: "error",
        message: result.error ?? "Something went wrong.",
      });
    }
  };

  return (
    <>
      <div
        id="window-header"
        className="relative flex items-center gap-4"
        onDoubleClick={() => maximizeWindow("contact")}
      >
        <WindowControls target="contact" />

        <div className="flex items-center gap-4 ml-24">
          <button className="mail-toolbar-btn">
            <Archive size={16} />
          </button>
          <button className="mail-toolbar-btn">
            <ShieldAlert size={16} />
          </button>
          <button className="mail-toolbar-btn">
            <Trash2 size={16} />
          </button>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-600" />
          <button className="mail-toolbar-btn">
            <Reply size={16} />
          </button>
          <button className="mail-toolbar-btn">
            <Forward size={16} />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100%-45px)]">
        <aside className="mail-sidebar">
          <div className="space-y-6">
            <div>
              <h3 className="mail-section-title">Favorites</h3>
              <div className="space-y-0.5">
                {MAILBOX_ITEMS.map(({ id, label, icon: Icon, count }) => (
                  <button
                    key={id}
                    onClick={() => setActiveMailbox(id)}
                    className={clsx(
                      "mail-nav-item",
                      activeMailbox === id && "active",
                    )}
                  >
                    <Icon size={14} />
                    <span>{label}</span>
                    {count && (
                      <span className="ml-auto text-[11px]">{count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mail-section-title">Social</h3>
              <div className="space-y-0.5">
                {socials.map(({ id, text, icon, link }) => (
                  <Link
                    key={id}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mail-nav-item"
                  >
                    <Image
                      src={icon}
                      alt={text}
                      width={14}
                      height={14}
                      className="invert dark:invert-0"
                    />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="mail-compose">
          <div className="mail-banner">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border border-white/60 shrink-0">
              <Image
                src="/images/rahul.webp"
                alt="Rahul"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Let&apos;s work together!
              </h2>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed max-w-lg">
                I&apos;m currently looking for new opportunities and
                collaborations. Reach out below if you have a project in mind or
                just want to connect!
              </p>
            </div>
          </div>

          <div className="mail-fields">
            <div className="mail-field-row">
              <span className="mail-field-label">To:</span>
              <span className="mail-email-chip">
                rahulcheryala787@gmail.com
              </span>
            </div>
            <div className="mail-field-row">
              <span className="mail-field-label">From:</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.from}
                onChange={(e) => updateField("from", e.target.value)}
                placeholder="your@email.com"
                className="mail-field-input"
                suppressHydrationWarning
              />
            </div>
            <div className="mail-field-row">
              <span className="mail-field-label">Cc:</span>
              <input
                type="text"
                value={formData.cc}
                onChange={(e) => updateField("cc", e.target.value)}
                className="mail-field-input"
              />
            </div>
            <div className="mail-field-row">
              <span className="mail-field-label">Subject:</span>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className="mail-field-input font-medium text-[14px]"
              />
            </div>
          </div>

          <div className="mail-body">
            <textarea
              value={formData.body}
              onChange={(e) => updateField("body", e.target.value)}
              placeholder="Type your message here..."
            />
          </div>

          <div className="mail-bottom-bar">
            <button className="mail-toolbar-btn">
              <AlignLeft size={18} />
            </button>
            <button className="mail-toolbar-btn">
              <Paperclip size={18} />
            </button>
            <button className="mail-toolbar-btn">
              <Smile size={18} />
            </button>
            <div className="flex-1" />
            {status && (
              <span className={`text-[12px] ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </span>
            )}
            <button
              onClick={handleSend}
              disabled={sending}
              className="mail-send-btn disabled:opacity-50"
            >
              <Send size={12} />
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
