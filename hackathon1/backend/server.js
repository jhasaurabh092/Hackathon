import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { initDb } from './db.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ─── Boot: initialise database ────────────────────────────────────────────────

let db;
(async () => {
    db = await initDb();
    console.log(`\n💰 Rupee Pocket backend running on http://localhost:${PORT}`);
    console.log(`   Database: game.db.json`);
    console.log(`   Endpoints:`);
    console.log(`     POST /api/signup`);
    console.log(`     POST /api/login`);
    console.log(`     POST /api/score`);
    console.log(`     GET  /api/leaderboard\n`);
})();

// ─── Middleware: ensure db is ready ──────────────────────────────────────────

app.use((req, res, next) => {
    if (!db) return res.status(503).json({ ok: false, error: 'Database not ready yet.' });
    next();
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nextId(arr) {
    return arr.length === 0 ? 1 : Math.max(...arr.map(r => r.id)) + 1;
}

function buildGameState(scoreRow) {
    if (!scoreRow) {
        return { money: 100, level: 1, completedChapters: [], pendingReturns: 0, playerCode: '' };
    }
    return {
        money: scoreRow.money,
        level: scoreRow.level,
        completedChapters: scoreRow.completedChapters ?? [],
        pendingReturns: scoreRow.pendingReturns ?? 0,
        playerCode: scoreRow.playerCode ?? '',
    };
}

// ─── POST /api/signup ────────────────────────────────────────────────────────

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body ?? {};

    if (!username || typeof username !== 'string')
        return res.status(400).json({ ok: false, error: 'Username is required.' });
    if (!password || typeof password !== 'string')
        return res.status(400).json({ ok: false, error: 'Password is required.' });

    const trimmed = username.trim();
    if (trimmed.length < 2 || trimmed.length > 20)
        return res.status(400).json({ ok: false, error: 'Username must be 2–20 characters.' });
    if (password.length < 4)
        return res.status(400).json({ ok: false, error: 'Password must be at least 4 characters.' });

    // Check unique username (case-insensitive)
    const existing = db.data.users.find(
        u => u.username.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing)
        return res.status(409).json({ ok: false, error: 'Username already taken. Try another!' });

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = nextId(db.data.users);

    db.data.users.push({ id: userId, username: trimmed, passwordHash, createdAt: new Date().toISOString() });
    db.data.scores.push({
        userId,
        money: 100,
        level: 1,
        completedChapters: [],
        pendingReturns: 0,
        playerCode: '',
        updatedAt: new Date().toISOString(),
    });
    await db.write();

    return res.json({ ok: true, userId, username: trimmed });
});

// ─── POST /api/login ─────────────────────────────────────────────────────────

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body ?? {};

    if (!username || !password)
        return res.status(400).json({ ok: false, error: 'Username and password are required.' });

    const user = db.data.users.find(
        u => u.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (!user)
        return res.status(401).json({ ok: false, error: 'Incorrect username or password.' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
        return res.status(401).json({ ok: false, error: 'Incorrect username or password.' });

    const scoreRow = db.data.scores.find(s => s.userId === user.id);
    const gameState = buildGameState(scoreRow);

    return res.json({ ok: true, userId: user.id, username: user.username, gameState });
});

// ─── POST /api/score ─────────────────────────────────────────────────────────

app.post('/api/score', async (req, res) => {
    const { userId, money, level, completedChapters, pendingReturns, playerCode } = req.body ?? {};

    if (!userId)
        return res.status(400).json({ ok: false, error: 'userId is required.' });

    const user = db.data.users.find(u => u.id === userId);
    if (!user)
        return res.status(404).json({ ok: false, error: 'User not found.' });

    const idx = db.data.scores.findIndex(s => s.userId === userId);
    const scoreData = {
        userId,
        money: money ?? 100,
        level: level ?? 1,
        completedChapters: completedChapters ?? [],
        pendingReturns: pendingReturns ?? 0,
        playerCode: playerCode ?? '',
        updatedAt: new Date().toISOString(),
    };

    if (idx === -1) {
        db.data.scores.push(scoreData);
    } else {
        db.data.scores[idx] = scoreData;
    }
    await db.write();

    return res.json({ ok: true });
});

// ─── GET /api/leaderboard ────────────────────────────────────────────────────

app.get('/api/leaderboard', (_req, res) => {
    const result = db.data.scores
        .map(s => {
            const user = db.data.users.find(u => u.id === s.userId);
            if (!user) return null;
            return {
                username: user.username,
                money: s.money,
                level: s.level,
                completedChapters: (s.completedChapters ?? []).length,
                updatedAt: s.updatedAt,
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.money - a.money || new Date(a.updatedAt) - new Date(b.updatedAt))
        .slice(0, 20);

    return res.json(result);
});

// ─── Health check ─────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT);
