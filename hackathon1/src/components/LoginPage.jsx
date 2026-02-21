import React, { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './LoginPage.css';

export default function LoginPage() {
    const { login } = useGame();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) { setError('Please enter your name!'); return; }
        if (trimmed.length < 2) { setError('Name must be at least 2 characters.'); return; }
        if (trimmed.length > 20) { setError('Name too long (max 20 chars).'); return; }

        setLoading(true);
        try {
            await fetch(`/login?username=${encodeURIComponent(trimmed)}`, { method: 'POST' });
        } catch {
            // Backend may not be running in dev — continue anyway
        }
        setLoading(false);
        login(trimmed);
    };

    return (
        <div className="login-page center-page">
            <div className="login-card card fade-up">
                <div className="login-logo">
                    <span className="logo-icon">🚀</span>
                    <h1 className="logo-title">Rupee Pocket</h1>
                    <p className="logo-tagline">"Rupee in Pocket, Ride like Rocket!"</p>
                </div>

                <div className="login-badges">
                    <span>💰 Save</span>
                    <span>📈 Invest</span>
                    <span>🛡️ Avoid Fraud</span>
                    <span>🧠 Grow Smart</span>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Your Name, Hero 🦸</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="e.g. Aarav, Priya..."
                        value={name}
                        onChange={e => { setName(e.target.value); setError(''); }}
                        maxLength={20}
                        autoFocus
                    />
                    {error && <p className="login-error">{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={loading}
                    >
                        {loading ? '⏳ Starting...' : '🚀 Launch My Rocket!'}
                    </button>
                </form>

                <p className="login-hint">
                    Start with <strong>₹100</strong> and grow it across <strong>3 Levels</strong> &amp; <strong>15 Chapters</strong>!
                </p>
            </div>
        </div>
    );
}
