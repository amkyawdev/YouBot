// Settings Component
import { loadAppState, saveAppState } from '../../store/app.store.js';

export function initSettings() {
  const runtimeSelect = document.getElementById('runtime-select');
  const memorySlider = document.getElementById('memory-slider');
  const memoryValue = document.getElementById('memory-value');
  
  if (!runtimeSelect) return;
  
  // Load saved settings
  const state = loadAppState();
  
  if (runtimeSelect) {
    runtimeSelect.value = state.settings?.runtime || 'llama';
    runtimeSelect.addEventListener('change', handleRuntimeChange);
  }
  
  if (memorySlider && memoryValue) {
    memorySlider.value = state.settings?.maxMemory || 4;
    memoryValue.textContent = `${memorySlider.value} GB`;
    
    memorySlider.addEventListener('input', () => {
      memoryValue.textContent = `${memorySlider.value} GB`;
    });
    
    memorySlider.addEventListener('change', handleMemoryChange);
  }
  
  function handleRuntimeChange() {
    const state = loadAppState();
    state.settings.runtime = runtimeSelect.value;
    saveAppState(state);
    window.showToast('Runtime updated');
  }
  
  function handleMemoryChange() {
    const state = loadAppState();
    state.settings.maxMemory = parseInt(memorySlider.value);
    saveAppState(state);
    window.showToast(`Memory set to ${memorySlider.value} GB`);
  }
}

window.initSettings = initSettings;