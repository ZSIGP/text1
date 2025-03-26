// 缓存名称和版本
const CACHE_NAME = "alignos-cache-v1";

// 需要缓存的资源列表
const CACHE_URLS = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/chunk-vendors.js",
  "/css/app.css",
  "/img/icons/favicon.ico",
  "/assets/audio/background-music.mp3",
];

// 安装Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("缓存已打开");
        return cache.addAll(CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("删除旧缓存:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 拦截网络请求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // 如果在缓存中找到响应，则返回缓存的响应
        if (response) {
          return response;
        }

        // 否则，从网络获取
        return fetch(event.request).then((response) => {
          // 检查是否是有效的响应
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // 克隆响应，因为响应是流，只能使用一次
          const responseToCache = response.clone();

          // 打开缓存并存储响应
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // 如果网络和缓存都失败，可以返回一个离线页面
        if (event.request.url.includes(".html")) {
          return caches.match("/offline.html");
        }
      })
  );
});
