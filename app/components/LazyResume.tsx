"use client";

import dynamic from "next/dynamic";

const Resume = dynamic(() => import("@windows/Resume"), { ssr: false });

export default function LazyResume() {
  return <Resume />;
}
