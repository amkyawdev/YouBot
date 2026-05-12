// Settings Service
import { getDb } from '../database/sqlite/init.js';

const DEFAULT_SETTINGS = {
  runtime: 'llama',
  maxMemory: 4,
  temperature: 0.7,
  maxTokens: 2048,
  model: null
};

export async function getSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all();
  
  const settings = { ...DEFAULT_SETTINGS };
  
  for (const row of rows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch {
      settings[row.key] = row.value;
    }
  }
  
  return settings;
}

export async function getSetting(key) {
  const db = getDb();
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  
  if (!row) {
    return DEFAULT_SETTINGS[key] || null;
  }
  
  try {
    return JSON.parse(row.value);
  } catch {
    return row.value;
  }
}

export async function saveSettings(newSettings) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO settings (key, value)
    VALUES (?, ?)
  `);
  
  for (const [key, value] of Object.entries(newSettings)) {
    stmt.run(key, JSON.stringify(value));
  }
}

export async function saveSetting(key, value) {
  const db = getDb();
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
    .run(key, JSON.stringify(value));
}

export async function getRuntimeConfig() {
  return {
    runtime: await getSetting('runtime') || 'llama',
    maxMemory: await getSetting('maxMemory') || 4,
    temperature: await getSetting('temperature') || 0.7,
    maxTokens: await getSetting('maxTokens') || 2048
  };
}

export default { getSettings, getSetting, saveSettings, saveSetting, getRuntimeConfig };