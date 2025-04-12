const CACHE_NAME = 'wine-calculators-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/so2-calculator.html',
    '/css/style.css',
    '/js/topping-calculator.js',
    '/js/so2-calculator.js',
    '/icons/barrel-192.png',
    '/icons/barrel-512.png',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
