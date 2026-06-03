const CACHE_NAME = 'target-tracker-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// التثبيت وحفظ الملفات في الكاش
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// جلب الملفات من الكاش عند غياب الإنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});