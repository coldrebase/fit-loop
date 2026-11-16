/* FitLoop Service Worker
 * ---------------------------------------------------------------------------
 * 目标：安装到桌面后离线也能打开，静态资源走缓存优先。
 * 版本号改动会触发整包更新（旧缓存自动清理）。
 */
const VERSION = "fitloop-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./train/",
  "./diet/",
  "./progress/",
  "./me/",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(APP_SHELL).catch(() => undefined))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 页面导航：网络优先，断网时回退缓存（单页应用的路由都是静态 HTML）
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => undefined);
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const shell = await caches.match("./index.html");
          return shell || Response.error();
        }),
    );
    return;
  }

  // 静态资源：缓存优先，未命中再取网络并写缓存
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req)
          .then((res) => {
            if (res.ok && (res.type === "basic" || res.type === "default")) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => undefined);
            }
            return res;
          })
          .catch(() => cached || Response.error()),
    ),
  );
});