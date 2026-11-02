const CONTACT_HISTORY_KEY = "idealLeadOrigin";
const CONSULTATION_PATH = "/book-consultation";

// Only the live /contact page creates this history-entry marker. It is neither
// a query parameter nor a cookie, so copied URLs and other tabs do not inherit it.
export function redirectContactEnquiry(destination: string) {
  const target = new URL(destination, window.location.origin);
  if (window.location.pathname !== "/contact" ||
      target.origin !== window.location.origin || target.pathname !== CONSULTATION_PATH) return;

  try {
    window.history.replaceState({
      ...window.history.state,
      [CONTACT_HISTORY_KEY]: {
        source: "contact",
        destination: target.pathname + target.search,
      },
    }, "", target.href);
    // Reload the replaced entry so Next renders the destination. Preserve its
    // history state for refresh and back/forward, without exposing a URL marker.
    window.location.reload();
  } catch {
    // History restrictions must not prevent reaching the existing form.
    window.location.replace(target.href);
  }
}

export function consultationFormName(): "contact" | "consultation" {
  try {
    const marker = window.history.state?.[CONTACT_HISTORY_KEY];
    if (window.location.pathname === CONSULTATION_PATH &&
        marker?.source === "contact" &&
        marker.destination === window.location.pathname + window.location.search) {
      return "contact";
    }
  } catch {
    // Prefer consultation when browser history is unavailable or unrecognised.
  }
  return "consultation";
}
