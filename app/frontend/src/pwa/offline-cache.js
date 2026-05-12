// Offline Cache Management
const OFFLINE_CACHE = 'youbot-offline-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/src/styles/global.css',
  '/src/styles/theme.css',
  '/src/styles/animations.css'
];

// Precache offline pages
export async function cacheOffline(urls = CACHE_URLS) {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    await cache.addAll(urls);
    console.log('Offline pages cached');
  } catch (error) {
    console.error('Offline caching failed:', error);
  }
}

// Get offline status
export async function isOfflineReady() {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    const keys = await cache.keys();
    return keys.length > 0;
  } catch {
    return false;
  }
}

// Clear offline cache
export async function clearOfflineCache() {
  try {
    await caches.delete(OFFLINE_CACHE);
    console.log('Offline cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

// Export
window.OfflineCache = { cacheOffline, isOfflineReady, clearOfflineCache };