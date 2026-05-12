// Model Registry - Track available AI models
import { getDb } from '../database/sqlite/init.js';

export async function getModels() {
  const db = getDb();
  const models = db.prepare('SELECT * FROM models ORDER BY uploadedAt DESC').all();
  return models;
}

export async function getModelById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM models WHERE id = ?').get(id);
}

export async function saveModelMetadata(model) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO models (id, name, filename, format, size, path, uploadedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    model.id,
    model.name,
    model.filename,
    model.format,
    model.size,
    model.path,
    model.uploadedAt
  );
}

export async function deleteModelFromDB(id) {
  const db = getDb();
  db.prepare('DELETE FROM models WHERE id = ?').run(id);
}

export async function updateModelStatus(id, status) {
  const db = getDb();
  db.prepare('UPDATE models SET status = ?, updatedAt = ? WHERE id = ?')
    .run(status, new Date().toISOString(), id);
}

export async function scanModelsDirectory(directory) {
  const fs = await import('fs');
  const path = await import('path');
  
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const files = fs.readdirSync(directory);
  const models = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.gguf', '.onnx', '.bin'].includes(ext);
    })
    .map(file => ({
      name: file,
      path: path.join(directory, file),
      format: path.extname(file).slice(1)
    }));
  
  return models;
}