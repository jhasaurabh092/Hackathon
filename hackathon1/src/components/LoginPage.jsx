import React, { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './LoginPage.css';

export default function LoginPage() {
    const { login } = useGame();
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const clearFields = () => { setError(''); setUsername(''); setPassword(''); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUser = username.trim();
        const trimmedPass = password.trim();

        if (!trimmedUser) { setError('Please enter a username!'); return; }
        if (trimmedUser.length < 2) { setError('Username must be at least 2 characters.'); return; }
        if (trimmedUser.length > 20) { setError('Username too long (max 20 chars).'); return; }
        if (!trimmedPass) { setError('Please enter a password!'); return; }
        if (mode === 'signup' && trimmedPass.length < 4) {
            setError('Password must be at least 4 characters.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: trimmedUser, password: trimmedPass }),
            });
            const data = await res.json();

            if (!data.ok) {
                setError(data.error || 'Something went wrong.');
                setLoading(false);
                return;
            }

            // data: { ok, userId, username, gameState? }
            login(data.username, data.userId, data.gameState ?? null);
        } catch {
            setError('Cannot reach server. Make sure the backend is running.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page center-page">
            <div className="login-card card fade-up">
                <div className="login-logo">
                    <span className="logo-icon">💰</span>
                    <h1 className="logo-title">Rupee Pocket</h1>
                    <p className="logo-tagline">"Rupee in Pocket, Ride like Rocket!"</p>
                </div>

                <div className="login-badges">
                    <span>💰 Save</span>
                    <span>📈 Invest</span>
                    <span>🛡️ Avoid Fraud</span>
                    <span>🧠 Grow Smart</span>
                </div>

                {/* Mode toggle */}
                <div className="login-tabs">
                    <button
                        type="button"
                        className={`login-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => { setMode('login'); clearFields(); }}
                    >
                        🔑 Log In
                    </button>
                    <button
                        type="button"
                        className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => { setMode('signup'); clearFields(); }}
                    >
                        🌟 Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">
                        {mode === 'signup' ? 'Choose a Username 🦸' : 'Username'}
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="e.g. Aarav, Priya..."
                        value={username}
                        onChange={e => { setUsername(e.target.value); setError(''); }}
                        maxLength={20}
                        autoFocus
                        autoComplete="username"
                    />

                    <label htmlFor="password" style={{ marginTop: '0.75rem' }}>
                        Password 🔒
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder={mode === 'signup' ? 'Min 4 characters' : 'Your password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(''); }}
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    />

                    {error && <p className="login-error">⚠️ {error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={loading}
                        style={{ marginTop: '1rem' }}
                    >
                        {loading
                            ? '⏳ Please wait...'
                            : mode === 'signup'
                                ? '🚀 Create Account & Play!'
                                : '🎮 Log In & Play!'
                        }
                    </button>
                </form>

                <p className="login-hint">
                    {mode === 'signup'
                        ? <>Start with <strong>₹100</strong> and grow it across <strong>3 Levels</strong> &amp; <strong>15 Chapters</strong>!</>
                        : <>Your progress is <strong>saved</strong> — pick up right where you left off!</>
                    }
                </p>
            </div>
        </div>
    );
}
