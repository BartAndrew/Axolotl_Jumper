const CACHE_NAME = 'axolotl-jumper-cache-v4';
const APP_SHELL_URLS = [
  './',
  'index.html',
  'manifest.json',
  'service-worker.js',
  'axolotl.png',
  'platforms.png',
  'background.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('index.html');
          }
          return caches.match('./');
        });
    })
  );
});
