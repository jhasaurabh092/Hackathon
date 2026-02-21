import React from 'react';
import { useGame } from '../context/GameContext.jsx';
import './HUD.css';

export default function HUD({ onLeaderboard }) {
    const { state, logout } = useGame();

    return (
        <header className="hud">
            {/* LEFT: brand name + tagline only */}
            <div className="hud-left">
                <div className="hud-brand">
                    <span className="hud-logo">💰 Rupee Pocket</span>
                    <span className="hud-tagline">"Rupee in Pocket, Ride like Rocket!"</span>
                </div>
            </div>

            <div className="hud-center">
                <div className="hud-stat">
                    <span className="hud-stat-label">💰 Balance</span>
                    <span className="hud-stat-value money-amount">₹{state.money}</span>
                </div>
                <div className="hud-divider" />
                <div className="hud-stat">
                    <span className="hud-stat-label">🏆 Level</span>
                    <span className="hud-stat-value hud-level">Level {state.level}</span>
                </div>
                {state.pendingReturns > 0 && (
                    <>
                        <div className="hud-divider" />
                        <div className="hud-stat hud-pending">
                            <span className="hud-stat-label">⏳ Pending</span>
                            <span className="hud-stat-value">+₹{state.pendingReturns}</span>
                        </div>
                    </>
                )}
            </div>

            {/* RIGHT: username + player code + action buttons */}
            <div className="hud-right">
                <div className="hud-player-info">
                    <span className="hud-player">👤 {state.username}</span>
                    {state.playerCode && (
                        <span className="hud-code" title="Your Player Code">#{state.playerCode}</span>
                    )}
                </div>
                <div className="hud-divider hud-divider-v" />
                <button className="btn btn-primary hud-btn" onClick={onLeaderboard}>🏅 Scores</button>
                <button className="btn hud-btn hud-logout" onClick={logout} title="Reset Game">🔄</button>
            </div>
        </header>
    );
}
