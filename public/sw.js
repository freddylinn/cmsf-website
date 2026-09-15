/* Colorado Motor Speech Framework — service worker.
 *
 * Goal: a clinician who has opened the tool once can open it again with no
 * network at all, which matters because hospital and clinic wifi is unreliable
 * in exactly the rooms where the assessment happens.
 *
 * Strategy:
 *   - Navigations are network-first, falling back to the cached shell. This
 *     means a new deployment is picked up as soon as there is a connection,
 *     rather than users being pinned to a stale build.
 *   - Static assets are cache-first. The build gives every JS/CSS file a
 *     content hash, so a new deploy produces new filenames and can never be
 *     served from an old cache entry.
 *   - Anything cross-origin (analytics, fonts) is left entirely alone.
 *
 * The app stores no patient data, so nothing sensitive is ever written here —
 * only the application's own files.
 */

const VERSION = "cmsf-v5";
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;

// Files that must be present for the app to boot with no network. The hashed
// JS/CSS bundle names change every build, so they are read at install time
// from the asset manifest the build already produces rather than hard-coded.
//
// Precaching these matters: a fetch is only cached by this worker once the
// worker controls the page, which does not happen until after the first load
// has already downloaded its bundles. Without precaching, offline use would
// require two full visits.
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon-32-v2.png",
  "./favicon-64-v2.png",
  "./icons/icon-192-v2.png",
  "./icons/icon-512-v2.png",
  "./icons/apple-touch-icon-180-v2.png",
];

async function precache() {
  const cache = await caches.open(SHELL_CACHE);
  await Promise.allSettled(SHELL.map((url) => cache.add(url)));

  // Add the current build's entrypoints and static assets.
  try {
    const res = await fetch("./asset-manifest.json", { cache: "no-cache" });
    if (!res.ok) return;
    const manifest = await res.json();

    const urls = new Set(manifest.entrypoints || []);
    Object.values(manifest.files || {}).forEach((f) => {
      // Source maps are large and never needed at runtime.
      if (typeof f === "string" && !f.endsWith(".map")) urls.add(f);
    });

    await Promise.allSettled(
      [...urls].map((u) => cache.add(u.startsWith("/") ? u : `/${u}`))
    );
  } catch (err) {
    // An unreachable manifest must not fail the install; runtime caching
    // will still populate on the next visit.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.startsWith(VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // analytics, CDNs, etc.

  // Page loads: prefer the network so updates arrive promptly.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() =>
          caches
            .match("./index.html")
            .then((cached) => cached || caches.match("./"))
        )
    );
    return;
  }

  // Everything else: serve from cache, populate it on first fetch.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
