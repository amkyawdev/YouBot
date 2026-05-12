// Model API - Model management
const API_BASE = '/api';

export async function getModels() {
  try {
    const response = await fetch(`${API_BASE}/models`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Get models error:', error);
    return [];
  }
}

export async function uploadModel(file) {
  const formData = new FormData();
  formData.append('model', file);
  
  try {
    const response = await fetch(`${API_BASE}/models/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Upload model error:', error);
    throw error;
  }
}

export async function loadModel(modelId) {
  try {
    const response = await fetch(`${API_BASE}/models/${modelId}/load`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Load model error:', error);
    throw error;
  }
}

export async function unloadModel(modelId) {
  try {
    const response = await fetch(`${API_BASE}/models/${modelId}/unload`, {
      method: 'POST'
    });
    return response.ok;
  } catch (error) {
    console.error('Unload model error:', error);
    return false;
  }
}

export async function deleteModel(modelId) {
  try {
    const response = await fetch(`${API_BASE}/models/${modelId}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Delete model error:', error);
    return false;
  }
}

// Export
window.ModelAPI = { getModels, uploadModel, loadModel, unloadModel, deleteModel };