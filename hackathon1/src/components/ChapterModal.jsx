import React, { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './ChapterModal.css';

export default function ChapterModal({ chapter, onClose }) {
    const { completeChapter, state } = useGame();
    const [chosen, setChosen] = useState(null);
    const isAlreadyDone = state.completedChapters.includes(chapter.id);

    const handleChoice = (choice) => {
        if (chosen || isAlreadyDone) return;
        setChosen(choice);
        completeChapter(chapter.id, choice);
    };

    const getResultText = (choice) => {
        if (!choice) return null;
        const gain = typeof choice.money === 'number' ? choice.money : 0;
        const pend = typeof choice.pending === 'number' ? choice.pending : 0;
        const parts = [];
        if (gain > 0) parts.push(`+₹${gain} added to your balance!`);
        if (gain < 0) parts.push(`₹${Math.abs(gain)} deducted from your balance.`);
        if (pend > 0) parts.push(`₹${pend} added as pending long-term return!`);
        return parts.length ? parts.join(' ') : 'No money change.';
    };

    const resultPositive = chosen && ((chosen.money || 0) >= 0 || (chosen.pending || 0) > 0);

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && !chosen && onClose()}>
            <div className="modal-box">
                {/* Header */}
                <div className="modal-header">
                    <span className="modal-chapter-num">Chapter {chapter.id}</span>
                    <h2 className="modal-title">{chapter.emoji} {chapter.title}</h2>
                </div>

                {/* Scenario */}
                <p className="modal-scenario">{chapter.text}</p>

                {/* Choices */}
                {!chosen && !isAlreadyDone && (
                    <div className="modal-choices">
                        <p className="choices-prompt">What do you choose?</p>
                        {chapter.choices.map((choice, i) => (
                            <button
                                key={i}
                                className="choice-btn"
                                onClick={() => handleChoice(choice)}
                            >
                                <span className="choice-label">{choice.label}</span>
                                <span className="choice-desc">{choice.desc}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Already done message */}
                {isAlreadyDone && !chosen && (
                    <div className="result-banner positive">✅ You've already completed this chapter!</div>
                )}

                {/* Result after choosing */}
                {chosen && (
                    <div className={`result-banner ${resultPositive ? 'positive' : 'negative'}`}>
                        <div className="result-choice">You chose: <strong>{chosen.label}</strong></div>
                        <div className="result-money">{getResultText(chosen)}</div>
                    </div>
                )}

                {/* Balance display */}
                <div className="modal-balance">
                    💰 Balance: <strong className="money-amount" style={{ fontSize: '1.4rem' }}>₹{state.money}</strong>
                    {state.pendingReturns > 0 && (
                        <span className="modal-pending"> ⏳ +₹{state.pendingReturns} pending</span>
                    )}
                </div>

                <button
                    className="btn btn-primary btn-block"
                    style={{ marginTop: 16 }}
                    onClick={onClose}
                >
                    {chosen || isAlreadyDone ? '✅ Continue Adventure' : '↩ Go Back'}
                </button>
            </div>
        </div>
    );
}
