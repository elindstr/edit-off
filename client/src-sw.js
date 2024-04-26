// workbox docs: https://developer.chrome.com/docs/workbox/modules/workbox-recipes

const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// caching files on SW registration 
precacheAndRoute(self.__WB_MANIFEST);

// pages served from cache first; go to network only not in cache
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// urls served from cache first; go to network only not in cache
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
//navigation requests use cache-first strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// asset caching: serve cached assets first, but also fetch in the background to update the cache for next load
const { StaleWhileRevalidate } = require('workbox-strategies');
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// basic offline support: serving fallback content
offlineFallback();

// empty fetch: minimally required to register SW
self.addEventListener('fetch', function (event) {});
