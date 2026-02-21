import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './Leaderboard.css';

export default function Leaderboard({ onClose }) {
    const { state } = useGame();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(r => r.json())
            .then(data => {
                // Support both array and { scores: [] } shapes
                const list = Array.isArray(data) ? data : (data.scores || []);
                setScores(list);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load leaderboard (backend offline).');
                setLoading(false);
            });
    }, []);

    const medals = ['🥇', '🥈', '🥉'];

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box leaderboard-box">
                <h2 className="lb-title">🏆 Leaderboard</h2>

                {loading && <p className="lb-loading">⏳ Loading scores...</p>}
                {error && <p className="lb-error">{error}</p>}

                {!loading && !error && scores.length === 0 && (
                    <p className="lb-empty">No scores yet — be the first! 🚀</p>
                )}

                {!loading && scores.length > 0 && (
                    <div className="lb-list">
                        {scores.map((entry, i) => (
                            <div
                                key={i}
                                className={`lb-row ${i < 3 ? 'lb-top' : ''} ${entry.username === state.username ? 'lb-me' : ''}`}
                            >
                                <span className="lb-rank">{medals[i] || `#${i + 1}`}</span>
                                <span className="lb-name">
                                    {entry.username}
                                    {entry.username === state.username && <span className="lb-you"> (You)</span>}
                                </span>
                                <span className="lb-meta">Lvl {entry.level} · {entry.completedChapters}/15 ch</span>
                                <span className="lb-score">₹{entry.money}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={onClose}>
                    ← Back to Game
                </button>
            </div>
        </div>
    );
}
