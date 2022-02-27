const CACHE_NAME = "version-1";
const UrlsToCache = ["index.html", "offline.html"];

// Install Service Worker
this.self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache! ");
      return cache.addAll(UrlsToCache);
    })
  );
});

// Listen for Request
this.self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => {
        return caches.match("offline.html");
      });
    })
  );
});

// Activate Service Worker
this.self.addEventListener("activate", (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    e.waitUntil(
        caches.keys().then((cacheNames)=> {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});
