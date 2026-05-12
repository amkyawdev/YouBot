// Models Component
import { getModels, uploadModel, loadModel, deleteModel } from '../../api/model.api.js';

export function initModels() {
  const modelsList = document.getElementById('models-list');
  const uploadBtn = document.getElementById('upload-model');
  
  if (!modelsList) return;
  
  // Load models on init
  loadModels();
  
  // Upload button click
  if (uploadBtn) {
    uploadBtn.addEventListener('click', handleUpload);
  }
  
  async function loadModels() {
    try {
      const models = await getModels();
      renderModels(models);
    } catch (error) {
      console.error('Failed to load models:', error);
      modelsList.innerHTML = '<p class="empty-state">Failed to load models.</p>';
    }
  }
  
  function renderModels(models) {
    if (!models.length) {
      modelsList.innerHTML = '<p class="empty-state">No models loaded. Upload a model to get started.</p>';
      return;
    }
    
    modelsList.innerHTML = models.map(model => `
      <div class="model-card" data-id="${model.id}">
        <div class="model-name">${model.name}</div>
        <div class="model-info">
          <span>${model.format}</span>
          <span>${model.size}</span>
        </div>
        <div class="model-actions">
          <button class="btn-load" data-id="${model.id}">Load</button>
          <button class="btn-delete" data-id="${model.id}">Delete</button>
        </div>
      </div>
    `).join('');
    
    // Attach event listeners
    modelsList.querySelectorAll('.btn-load').forEach(btn => {
      btn.addEventListener('click', () => handleLoad(btn.dataset.id));
    });
    
    modelsList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => handleDelete(btn.dataset.id));
    });
  }
  
  async function handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gguf,.onnx,.bin';
    
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';
        
        await uploadModel(file);
        
        window.showToast('Model uploaded successfully!');
        loadModels();
      } catch (error) {
        window.showToast('Failed to upload model', 'error');
      } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload Model';
      }
    });
    
    input.click();
  }
  
  async function handleLoad(modelId) {
    try {
      await loadModel(modelId);
      window.showToast('Model loaded!');
    } catch (error) {
      window.showToast('Failed to load model', 'error');
    }
  }
  
  async function handleDelete(modelId) {
    if (!confirm('Delete this model?')) return;
    
    try {
      await deleteModel(modelId);
      window.showToast('Model deleted');
      loadModels();
    } catch (error) {
      window.showToast('Failed to delete model', 'error');
    }
  }
}

window.initModels = initModels;