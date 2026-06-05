const CACHE_NAME = "munpaweb-shell-v68";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./src/app.js",
  "./manifest.webmanifest",
  "./assets/portraits/founders/founder-male-01.png",
  "./assets/portraits/founders/founder-female-01.png",
  "./assets/portraits/disciples/disciple-male-01/age-08.png",
  "./assets/portraits/disciples/disciple-male-01/age-16.png",
  "./assets/portraits/disciples/disciple-male-01/age-30s.png",
  "./assets/portraits/disciples/disciple-male-01/age-50s.png",
  "./assets/portraits/disciples/disciple-male-01/age-70s.png",
  "./assets/portraits/disciples/disciple-female-01/age-08.png",
  "./assets/portraits/disciples/disciple-female-01/age-16.png",
  "./assets/portraits/disciples/disciple-female-01/age-30s.png",
  "./assets/portraits/disciples/disciple-female-01/age-50s.png",
  "./assets/portraits/disciples/disciple-female-01/age-70s.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      const hadPreviousShell = names.some(
        (name) => name.startsWith("munpaweb-shell-") && name !== CACHE_NAME
      );

      return Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
        .then(() => self.clients.claim())
        .then(() => {
          if (!hadPreviousShell) {
            return undefined;
          }

          return self.clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clients) =>
              Promise.all(
                clients.map((client) =>
                  "navigate" in client ? client.navigate(client.url) : undefined
                )
              )
            );
        });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
