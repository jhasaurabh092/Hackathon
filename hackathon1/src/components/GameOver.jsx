import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './GameOver.css';

export default function GameOver({ onLeaderboard }) {
    const { state, logout } = useGame();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Auto-submit score when game ends
        const submit = async () => {
            setSubmitting(true);
            try {
                await fetch('/api/score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: state.userId,
                        money: state.money,
                        level: state.level,
                        completedChapters: state.completedChapters,
                        pendingReturns: state.pendingReturns,
                        playerCode: state.playerCode,
                    }),
                });
            } catch {
                // Backend offline — silent fail
            }
            setSubmitted(true);
            setSubmitting(false);
        };
        submit();
    }, []);

    const getRating = (money) => {
        if (money >= 300) return { label: 'Money Master! 🏆', color: '#ffd93d' };
        if (money >= 200) return { label: 'Smart Saver! 🌟', color: '#6bcb77' };
        if (money >= 100) return { label: 'On the Right Track! 👍', color: '#6c63ff' };
        return { label: 'Keep Learning! 💪', color: '#ff6b6b' };
    };

    const rating = getRating(state.money);

    return (
        <div className="gameover-page center-page">
            <div className="gameover-card card pop">
                <div className="gameover-fireworks">🎉🚀🎊</div>
                <h1 className="gameover-title">Mission Complete!</h1>
                <p className="gameover-player">Well done, <strong>{state.username}</strong>!</p>

                <div className="gameover-money">
                    <span className="go-label">Final Balance</span>
                    <span className="money-amount go-amount">₹{state.money}</span>
                </div>

                <div className="gameover-rating" style={{ background: rating.color + '22', borderColor: rating.color }}>
                    {rating.label}
                </div>
                <p className="gameover-tagline">🚀 Rupee in Pocket, Ride like Rocket!</p>

                <p className="gameover-hint">
                    {submitted ? '✅ Score submitted to leaderboard!' : submitting ? '⏳ Submitting score...' : ''}
                </p>

                <div className="gameover-stats">
                    <div className="go-stat">
                        <span>📚 Chapters</span>
                        <strong>15 / 15</strong>
                    </div>
                    <div className="go-stat">
                        <span>🏆 Levels</span>
                        <strong>3 / 3</strong>
                    </div>
                </div>

                <div className="gameover-actions">
                    <button className="btn btn-primary btn-lg" onClick={onLeaderboard}>🏅 View Leaderboard</button>
                    <button className="btn btn-danger btn-lg" onClick={logout}>🔄 Play Again</button>
                </div>
            </div>
        </div>
    );
}
