// Model Routes
import express from 'express';
import { getModels, uploadModel, loadModel, unloadModel, deleteModel } from '../controllers/model.controller.js';

const router = express.Router();

// Get all models
router.get('/', getModels);

// Upload model
router.post('/upload', uploadModel);

// Load model
router.post('/:modelId/load', loadModel);

// Unload model
router.post('/:modelId/unload', unloadModel);

// Delete model
router.delete('/:modelId', deleteModel);

export default router;