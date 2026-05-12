// Settings Routes
import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { loadSettings, saveSettings } from '../services/config/settings.js';

const router = express.Router();

// Get all settings
router.get('/', getSettings);

// Update settings
router.put('/', updateSettings);

export default router;