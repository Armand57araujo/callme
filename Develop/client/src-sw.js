// TODO: Create a service worker that caches static assets:

const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

const assetsToCache = [
    '/',
    '/index.html',
    '/install.html',
    '/cards.html',
    '/src/css/style.css',
    '/src/js/index.js',
    '/src/js/install.js',
    '/src/js/cards.js',
    '/src/js/app.js',
];

self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});


