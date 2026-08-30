// Service Worker for Sweet Celebrations PWA

const CACHE_NAME = 'marycakes-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/vite.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Add your static asset paths if needed (e.g., images, fonts)
  // Google Fonts will be cached dynamically via runtime caching
]

// Install: cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit – return response
        if (response) {
          return response
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone()

        // Try network
        return fetch(fetchRequest).then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse
          }

          // Clone the response because it can only be used once
          const responseToCache = networkResponse.clone()

          // Add to cache for future
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return networkResponse
        }).catch(() => {
          // Network failed – maybe return a fallback page?
          // For now, just return a generic offline message
          return new Response('Offline – please check your connection.', {
            status: 503,
            statusText: 'Service Unavailable'
          })
        })
      })
  )
})