// PWA Install Handler
let deferredPrompt;

export function initPWAInstall() {
  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
  });
  
  // App installed
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallPrompt();
    console.log('PWA installed');
  });
}

function showInstallPrompt() {
  // Show custom install button or banner
  // Could integrate with a UI component
  console.log('PWA install available');
}

function hideInstallPrompt() {
  console.log('Install prompt hidden');
}

// Trigger install
export async function triggerInstall() {
  if (!deferredPrompt) {
    console.log('No install prompt available');
    return false;
  }
  
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('PWA install accepted');
  } else {
    console.log('PWA install dismissed');
  }
  
  deferredPrompt = null;
  return outcome === 'accepted';
}

// Check if running as installed PWA
export function isPWAInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

// Export
window.PWAInstall = { initPWAInstall, triggerInstall, isPWAInstalled };