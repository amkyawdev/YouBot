// Model Loader Service
import { getModelById, updateModelStatus } from './model-registry.js';

const loadedModels = new Map();

export async function loadModel(modelId) {
  const model = await getModelById(modelId);
  
  if (!model) {
    throw new Error(`Model ${modelId} not found`);
  }
  
  if (loadedModels.has(modelId)) {
    return { message: 'Model already loaded' };
  }
  
  // Load logic depends on format
  let instance;
  
  switch (model.format) {
    case 'gguf':
      instance = await loadGGUFModel(model);
      break;
    case 'onnx':
      instance = await loadONNXModel(model);
      break;
    default:
      instance = await loadGenericModel(model);
  }
  
  loadedModels.set(modelId, instance);
  await updateModelStatus(modelId, 'loaded');
  
  return { success: true, modelId };
}

export async function unloadModel(modelId) {
  const instance = loadedModels.get(modelId);
  
  if (!instance) {
    return { message: 'Model not loaded' };
  }
  
  // Unload based on runtime
  if (instance.unload) {
    await instance.unload();
  }
  
  loadedModels.delete(modelId);
  await updateModelStatus(modelId, 'unloaded');
  
  return { success: true };
}

export function getLoadedModel(modelId) {
  return loadedModels.get(modelId);
}

export function isModelLoaded(modelId) {
  return loadedModels.has(modelId);
}

// Format-specific loaders
async function loadGGUFModel(model) {
  // Placeholder - actual llama.cpp loading
  console.log(`Loading GGUF model: ${model.name}`);
  return { format: 'gguf', model };
}

async function loadONNXModel(model) {
  console.log(`Loading ONNX model: ${model.name}`);
  return { format: 'onnx', model };
}

async function loadGenericModel(model) {
  console.log(`Loading model: ${model.name}`);
  return { format: 'generic', model };
}

export default { loadModel, unloadModel, getLoadedModel, isModelLoaded };