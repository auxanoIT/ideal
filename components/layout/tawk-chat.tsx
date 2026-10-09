"use client";

import { useEffect } from "react";

type TawkApi = {
  onLoad?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

const scriptId = "ideal-solutions-tawk";
const embedUrl = "https://embed.tawk.to/6ac8b50b43669534c41c0f96/1k4g06dli";

// Mounted only after consent, inside the marketing shell (not Sanity Studio).
export function TawkChat() {
  useEffect(() => {
    let active = true;
    const api = (window.Tawk_API ??= {});
    api.onLoad = () => {
      if (active) api.showWidget?.();
      else api.hideWidget?.();
    };
    api.showWidget?.();

    // Preserve the conversation across client navigation and React remounts.
    if (!document.getElementById(scriptId)) {
      window.Tawk_LoadStart = new Date();
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = embedUrl;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }

    return () => {
      active = false;
      api.hideWidget?.();
    };
  }, []);

  return null;
}
