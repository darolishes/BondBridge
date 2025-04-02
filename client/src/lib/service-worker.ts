// This file will register a service worker for offline support
// It's referenced in main.tsx

const CACHE_NAME = 'bondbridge-v1';

// Assets to cache immediately when the service worker is installed
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
];

// Service worker install event handler
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => (self as any).skipWaiting())
  );
});

// Service worker activate event handler
self.addEventListener('activate', (event: any) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => (self as any).clients.claim())
  );
});

// Fetch event handler to provide offline support
self.addEventListener('fetch', (event: any) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response to cache it and return it
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  // Cache API responses
                  if (event.request.url.includes('/api/cards') ||
                      event.request.url.includes('/api/saved-cards')) {
                    cache.put(event.request, responseToCache);
                  }
                });

              return response;
            })
            .catch(err => {
              // For navigation requests, show the offline page
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
              
              // For API requests, try to serve cached data
              if (event.request.url.includes('/api/')) {
                return caches.match(event.request);
              }

              throw err;
            });
        })
    );
  }
});

// Background sync for pending operations
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'save-card') {
    event.waitUntil(syncSavedCards());
  }
});

// Function to handle syncing saved cards when back online
async function syncSavedCards() {
  const pendingOperations = await getPendingOperations();
  
  for (const op of pendingOperations) {
    try {
      if (op.type === 'save') {
        await fetch('/api/saved-cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cardId: op.cardId }),
        });
      } else if (op.type === 'delete') {
        await fetch(`/api/saved-cards/${op.cardId}`, {
          method: 'DELETE',
        });
      }
      
      // Remove from pending after successful sync
      await removePendingOperation(op.id);
    } catch (err) {
      console.error('Failed to sync operation:', err);
    }
  }
}

// Helper functions to manage pending operations in IndexedDB
async function getPendingOperations() {
  // This would use IndexedDB in a real implementation
  return JSON.parse(localStorage.getItem('pendingOperations') || '[]');
}

async function removePendingOperation(id: string) {
  const ops = await getPendingOperations();
  const filteredOps = ops.filter((op: any) => op.id !== id);
  localStorage.setItem('pendingOperations', JSON.stringify(filteredOps));
}

export {};
