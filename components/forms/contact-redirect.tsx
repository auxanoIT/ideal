"use client";

import { useEffect } from "react";

import { redirectContactEnquiry } from "@/lib/lead-attribution";

export function ContactRedirect({ destination }: { destination: string }) {
  useEffect(() => {
    redirectContactEnquiry(destination);
  }, [destination]);

  return <noscript><meta httpEquiv="refresh" content={`0;url=${destination}`} /></noscript>;
}
