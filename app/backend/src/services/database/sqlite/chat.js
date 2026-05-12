// Chat Storage Service
import { getDb } from '../database/sqlite/init.js';

export async function saveChat(chatId, history) {
  const db = getDb();
  const now = new Date().toISOString();
  
  const existing = db.prepare('SELECT id FROM chats WHERE id = ?').get(chatId);
  
  if (existing) {
    db.prepare(`
      UPDATE chats SET history = ?, updatedAt = ?
      WHERE id = ?
    `).run(JSON.stringify(history), now, chatId);
  } else {
    db.prepare(`
      INSERT INTO chats (id, history, createdAt, updatedAt)
      VALUES (?, ?, ?, ?)
    `).run(chatId, JSON.stringify(history), now, now);
  }
}

export async function getChat(chatId) {
  const db = getDb();
  const row = db.prepare('SELECT history FROM chats WHERE id = ?').get(chatId);
  
  if (!row) {
    return [];
  }
  
  try {
    return JSON.parse(row.history);
  } catch {
    return [];
  }
}

export async function deleteChat(chatId) {
  const db = getDb();
  db.prepare('DELETE FROM chats WHERE id = ?').run(chatId);
}

export async function listChats() {
  const db = getDb();
  return db.prepare('SELECT id, createdAt, updatedAt FROM chats ORDER BY updatedAt DESC').all();
}

export default { saveChat, getChat, deleteChat, listChats };