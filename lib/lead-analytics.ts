type FormName = "contact" | "consultation";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: "generate_lead",
      parameters: { form_name: FormName; currency: "NGN" },
    ) => void;
  }
}

// At-most-once dispatch attempts, not exactly-once delivery or confirmed Google
// receipt. Never retry after calling gtag, even if it throws. Keep only fixed
// attribution values in memory; reloads and tab closure discard pending events.
// One module-level processor survives component unmounts and client navigation.
const MAX_WAIT_MS = 30_000;
const MAX_QUEUE_SIZE = 50;
const INITIAL_DELAY_MS = 250;
const MAX_DELAY_MS = 4_000;
const pending: { formName: FormName; expiresAt: number }[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;
let delay = INITIAL_DELAY_MS;
let flushing = false;

function expire() {
  // A monotonic clock keeps wall-clock adjustments from extending the TTL.
  const now = performance.now();
  while (pending.length && pending[0].expiresAt <= now) pending.shift();
}

function flush() {
  if (flushing) return;
  if (timer !== undefined) clearTimeout(timer);
  timer = undefined;
  flushing = true;
  try {
    expire();
    if (typeof window.gtag === "function") {
      while (pending.length) {
        expire();
        const entry = pending.shift();
        if (!entry) break;
        try {
          window.gtag("event", "generate_lead", {
            form_name: entry.formName,
            currency: "NGN",
          });
        } catch {
          // Do not retry: gtag may have accepted the event before throwing.
        }
      }
    }
  } catch {
    // Even an unavailable analytics property must not affect the form.
  } finally {
    flushing = false;
    expire();
    if (pending.length) {
      // Wake at the oldest deadline even when the next backoff would exceed it.
      timer = setTimeout(flush, Math.min(delay, pending[0].expiresAt - performance.now()));
      delay = Math.min(delay * 2, MAX_DELAY_MS);
    } else {
      delay = INITIAL_DELAY_MS;
    }
  }
}

export function trackLead(formName: FormName) {
  try {
    expire();
    // Drop the newest event on overflow; preserve already queued submissions.
    if (pending.length >= MAX_QUEUE_SIZE) return;
    pending.push({ formName, expiresAt: performance.now() + MAX_WAIT_MS });
    if (timer === undefined && !flushing) flush();
  } catch {
    // Analytics is best effort and must never interrupt submission success.
  }
}
