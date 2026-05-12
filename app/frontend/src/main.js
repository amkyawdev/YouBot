// You Bot AI - Main Entry
import { initRouter } from './utils/router.js';
import { initChat } from './components/chat/chat.js';
import { initModels } from './components/model/models.js';
import { initSettings } from './components/ui/settings.js';
import { loadAppState, saveAppState } from './store/app.store.js';

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🤖 You Bot AI starting...');
  
  // Load persisted state
  const state = loadAppState();
  console.log('Loaded app state:', state);
  
  // Initialize router
  initRouter();
  
  // Initialize components
  initChat();
  initModels();
  initSettings();
  
  // Check for service worker (PWA)
  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  }
  
  // Handle installation
  handleInstallPrompt();
  
  console.log('✅ You Bot AI ready!');
});

// Register Service Worker
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    console.log('Service Worker registered:', registration.scope);
    
    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateToast();
        }
      });
    });
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

// Handle Install Prompt
function handleInstallPrompt() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });
  
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallButton();
  });
}

// Show Install Button
function showInstallButton() {
  // Could add custom install button logic here
  console.log('App can be installed');
}

// Hide Install Button  
function hideInstallButton() {
  console.log('App installed');
}

// Show Update Toast
function showUpdateToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = 'New version available! Refresh to update.';
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 5000);
  }
}

// Toast Helper
export function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Export for use in components
window.showToast = showToast;