"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export function StudioApp() {
  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "white" }}><NextStudio config={config} /></div>;
}
