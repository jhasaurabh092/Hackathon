import { JSONFilePreset } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'game.db.json');

// Default empty database structure
const defaultData = {
  users: [],    // { id, username, passwordHash, createdAt }
  scores: [],   // { userId, money, level, completedChapters, pendingReturns, playerCode, updatedAt }
};

// Initialize lowdb — returns a promise
export async function initDb() {
  const db = await JSONFilePreset(dbPath, defaultData);
  return db;
}
