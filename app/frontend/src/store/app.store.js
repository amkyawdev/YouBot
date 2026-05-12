// App Store - LocalStorage persistence
const STORAGE_KEY = 'youbot_state';

export function loadAppState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getDefaultState();
  } catch (e) {
    console.error('Failed to load app state:', e);
    return getDefaultState();
  }
}

export function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save app state:', e);
  }
}

function getDefaultState() {
  return {
    settings: {
      runtime: 'llama',
      maxMemory: 4,
      theme: 'dark'
    },
    lastPage: 'home',
    chatHistory: []
  };
}

// Export
window.loadAppState = loadAppState;
window.saveAppState = saveAppState;