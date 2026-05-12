// Model Controller
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getModels, saveModelMetadata, deleteModelFromDB } from '../services/model-loader/model-registry.js';
import { loadModel as loadModelRuntime, unloadModel as unloadModelRuntime } from '../services/model-loader/load-model.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODELS_DIR = path.join(__dirname, '../../models');

export async function getModels(req, res, next) {
  try {
    const models = await getModels();
    res.json(models);
  } catch (error) {
    next(error);
  }
}

export async function uploadModel(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No model file uploaded' });
    }
    
    const { originalname, filename, size, mimetype } = req.file;
    const ext = path.extname(originalname).toLowerCase();
    
    // Determine format
    let format = 'unknown';
    if (ext === '.gguf') format = 'gguf';
    else if (ext === '.onnx') format = 'onnx';
    else if (ext === '.bin') format = 'transformers';
    
    const modelData = {
      id: uuidv4(),
      name: originalname,
      filename,
      format,
      size,
      path: req.file.path,
      uploadedAt: new Date().toISOString()
    };
    
    await saveModelMetadata(modelData);
    
    res.json({
      success: true,
      model: modelData
    });
  } catch (error) {
    next(error);
  }
}

export async function loadModel(req, res, next) {
  try {
    const { modelId } = req.params;
    await loadModelRuntime(modelId);
    
    res.json({ success: true, modelId });
  } catch (error) {
    next(error);
  }
}

export async function unloadModel(req, res, next) {
  try {
    const { modelId } = req.params;
    await unloadModelRuntime(modelId);
    
    res.json({ success: true, modelId });
  } catch (error) {
    next(error);
  }
}

export async function deleteModel(req, res, next) {
  try {
    const { modelId } = req.params;
    const models = await getModels();
    const model = models.find(m => m.id === modelId);
    
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    // Delete file
    if (fs.existsSync(model.path)) {
      fs.unlinkSync(model.path);
    }
    
    // Delete from registry
    await deleteModelFromDB(modelId);
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}