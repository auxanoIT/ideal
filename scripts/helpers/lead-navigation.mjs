// Browser history semantics for deterministic routing tests. State belongs to
// an entry, survives reload/back/forward, and is absent from a copied URL.
export function navigation(initialUrl = 'https://example.com/book-consultation') {
  const entries = [{ url: new URL(initialUrl), state: null }];
  let index = 0;
  let reloads = 0;
  const browser = {
    get location() {
      return Object.assign(new URL(entries[index].url), {
        reload() { reloads++; },
        replace(url) { entries[index] = { url: new URL(url, entries[index].url), state: null }; },
      });
    },
    history: {
      get state() { return entries[index].state; },
      replaceState(state, _unused, url) {
        entries[index] = { state: structuredClone(state), url: new URL(url ?? entries[index].url, entries[index].url) };
      },
      pushState(state, _unused, url) {
        entries.splice(index + 1);
        entries.push({ state: structuredClone(state), url: new URL(url, entries[index].url) });
        index++;
      },
      back() { if (index > 0) index--; },
      forward() { if (index + 1 < entries.length) index++; },
    },
  };
  return {
    browser,
    navigate(url) { browser.history.pushState(null, '', url); },
    reloads: () => reloads,
    entries: () => entries.length,
  };
}
