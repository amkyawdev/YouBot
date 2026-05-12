// Settings Controller
import { getSettings, saveSettings } from '../services/config/settings.js';

export async function getSettings(req, res, next) {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const newSettings = req.body;
    await saveSettings(newSettings);
    
    res.json({ success: true, settings: newSettings });
  } catch (error) {
    next(error);
  }
}