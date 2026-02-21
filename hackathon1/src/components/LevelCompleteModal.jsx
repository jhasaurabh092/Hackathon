import React, { useEffect } from 'react';
import './LevelCompleteModal.css';
import { playCelebration } from '../utils/sounds.js';

const LEVEL_NAMES = {
    1: 'Basics of Money',
    2: 'Investment Decisions',
    3: 'Smart Spending & Values',
};

export default function LevelCompleteModal({ completedLevel, onClose }) {
    const nextLevel = completedLevel + 1;
    const isGameEnd = completedLevel === 3;

    useEffect(() => {
        playCelebration();
        const t = setTimeout(onClose, 6000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="lc-overlay" onClick={onClose}>

            {/* ── MAIN: Rocket sweeps LEFT → RIGHT across screen centre ── */}
            <div className="lc-rocket-lr" aria-hidden="true">
                <span className="lc-rocket-emoji">🚀</span>
                <span className="lc-trail">💨</span>
            </div>

            {/* ── Second rocket sweeps right → left, slightly higher ── */}
            <div className="lc-rocket-rl" aria-hidden="true">
                <span className="lc-rocket-emoji">🚀</span>
            </div>

            {/* ── Confetti coins & stars scattered across screen ── */}
            <div className="lc-confetti" aria-hidden="true">
                {['💰', '⭐', '✨', '💎', '🌟', '💰', '⭐', '✨', '💫', '💰', '🌟', '✨'].map((s, i) => (
                    <span key={i} className="lc-conf-item" style={{ '--ci': i }}>{s}</span>
                ))}
            </div>

            {/* ── Stars burst from centre ── */}
            <div className="lc-stars" aria-hidden="true">
                {['⭐', '🌟', '✨', '💫', '⭐', '🌟', '✨', '💫', '⭐', '🌟'].map((s, i) => (
                    <span key={i} className="lc-star" style={{ '--i': i }}>{s}</span>
                ))}
            </div>

            {/* ── Info card ── */}
            <div className="lc-card" onClick={e => e.stopPropagation()}>
                <div className="lc-wow">WOWwww!! 🎉</div>

                <div className="lc-badge">Level {completedLevel} Complete!</div>

                <div className="lc-level-name">{LEVEL_NAMES[completedLevel]}</div>

                {!isGameEnd ? (
                    <>
                        <div className="lc-unlock-text">
                            🔓 Level {nextLevel} Unlocked!
                        </div>
                        <div className="lc-next-name">{LEVEL_NAMES[nextLevel]}</div>
                        <div className="lc-bonus">+₹50 Bonus Added! 💰</div>
                    </>
                ) : (
                    <div className="lc-unlock-text">🏆 All Levels Complete! You're a Money Hero!</div>
                )}

                <button className="btn btn-primary lc-btn" onClick={onClose}>
                    🚀 Keep Going!
                </button>

                <p className="lc-hint">Auto-closing in 6s…</p>
            </div>
        </div>
    );
}

