import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import chapters from '../data/chapters.js';
import { playHurray, playAlert } from '../utils/sounds.js';

const INITIAL_STATE = {
    username: '',
    userId: null,
    playerCode: '',
    level: 1,
    money: 100,
    completedChapters: [],
    pendingReturns: 0,
};

const STORAGE_KEY = 'rupeepocket_state';

const GameContext = createContext(null);

/** Generate a 5-character alphanumeric code like "A3K9Z" */
function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

export function GameProvider({ children }) {
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : INITIAL_STATE;
        } catch {
            return INITIAL_STATE;
        }
    });

    // Debounce timer ref for backend save
    const saveTimerRef = useRef(null);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        if (state.username) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    // Auto-save to backend whenever game state changes (debounced 1s)
    useEffect(() => {
        if (!state.userId || !state.username) return;

        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => {
            saveProgressToBackend(state);
        }, 1000);

        return () => {
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        };
    }, [state.money, state.level, state.completedChapters, state.pendingReturns]);

    const saveProgressToBackend = useCallback(async (currentState) => {
        if (!currentState.userId) return;
        try {
            await fetch('/api/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentState.userId,
                    money: currentState.money,
                    level: currentState.level,
                    completedChapters: currentState.completedChapters,
                    pendingReturns: currentState.pendingReturns,
                    playerCode: currentState.playerCode,
                }),
            });
        } catch {
            // Backend offline — silent fail, localStorage still has state
        }
    }, []);

    // Login — accepts userId + optional saved game state from backend
    const login = useCallback((username, userId, savedGameState) => {
        const fresh = savedGameState
            ? {
                username,
                userId: userId ?? null,
                playerCode: savedGameState.playerCode || generateCode(),
                level: savedGameState.level ?? 1,
                money: savedGameState.money ?? 100,
                completedChapters: savedGameState.completedChapters ?? [],
                pendingReturns: savedGameState.pendingReturns ?? 0,
            }
            : { ...INITIAL_STATE, username, userId: userId ?? null, playerCode: generateCode() };

        setState(fresh);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }, []);

    // Logout / reset
    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setState(INITIAL_STATE);
    }, []);

    // Determine if a chapter is unlocked
    const isChapterUnlocked = useCallback((chapterId) => {
        if (chapterId === 1) return true;
        return state.completedChapters.includes(chapterId - 1);
    }, [state.completedChapters]);

    // Complete a chapter with a chosen option
    const completeChapter = useCallback((chapterId, choice) => {
        setState(prev => {
            if (prev.completedChapters.includes(chapterId)) return prev; // idempotent

            let newMoney = prev.money;
            let newPending = prev.pendingReturns;
            const newCompleted = [...prev.completedChapters, chapterId];

            // Apply money / pending effect
            if (typeof choice.pending === 'number') {
                newPending += choice.pending;
            }
            if (typeof choice.money === 'number') {
                newMoney += choice.money;
            }

            // Track net money change for sound (before clamping)
            const moneyDelta = newMoney - prev.money;

            // Clamp money to 0 minimum
            newMoney = Math.max(0, newMoney);

            // Check if finishing all 5 chapters of a level
            const chapter = chapters.find(c => c.id === chapterId);
            const currentLevel = chapter.level;
            const levelChapters = chapters.filter(c => c.level === currentLevel);
            const allLevelDone = levelChapters.every(c => newCompleted.includes(c.id));

            let levelBonusApplied = false;
            let newLevel = prev.level;
            if (allLevelDone) {
                // Reward: ₹50 bonus + flush pendingReturns
                newMoney += 50 + newPending;
                newPending = 0;
                newLevel = currentLevel < 3 ? currentLevel + 1 : currentLevel;
                levelBonusApplied = true;
            }

            // 🔊 Play sound based on net effect
            const totalDelta = newMoney - prev.money;
            if (levelBonusApplied || totalDelta > 0) {
                setTimeout(playHurray, 50);
            } else if (totalDelta < 0 || moneyDelta < 0) {
                setTimeout(playAlert, 50);
            }

            return {
                ...prev,
                money: Math.max(0, newMoney),
                pendingReturns: newPending,
                completedChapters: newCompleted,
                level: newLevel,
            };
        });
    }, []);

    // Check if entire game is finished
    const isGameOver = state.completedChapters.length === chapters.length;

    // Levels summary helper
    const getLevelStatus = useCallback((levelNum) => {
        const levelChapters = chapters.filter(c => c.level === levelNum);
        const done = levelChapters.filter(c => state.completedChapters.includes(c.id)).length;
        return { total: levelChapters.length, done, complete: done === levelChapters.length };
    }, [state.completedChapters]);

    return (
        <GameContext.Provider value={{
            state,
            login,
            logout,
            isChapterUnlocked,
            completeChapter,
            isGameOver,
            getLevelStatus,
            chapters,
            saveProgressToBackend,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGame must be used inside GameProvider');
    return ctx;
}
