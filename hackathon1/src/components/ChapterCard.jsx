import React from 'react';
import { useGame } from '../context/GameContext.jsx';
import './ChapterCard.css';

export default function ChapterCard({ chapter, onSelect }) {
    const { state, isChapterUnlocked } = useGame();
    const isCompleted = state.completedChapters.includes(chapter.id);
    const isUnlocked = isChapterUnlocked(chapter.id);
    const isLocked = !isUnlocked;

    const handleClick = () => {
        if (!isLocked) onSelect();
    };

    return (
        <div
            className={`chapter-card ${isCompleted ? 'chapter-done' : ''} ${isLocked ? 'chapter-locked' : 'chapter-playable'}`}
            onClick={handleClick}
            title={isLocked ? 'Complete the previous chapter first!' : chapter.title}
        >
            <div className="chapter-num">Ch. {chapter.id}</div>
            <div className="chapter-emoji">{isLocked ? '🔒' : isCompleted ? '✅' : chapter.emoji}</div>
            <div className="chapter-title">{chapter.title}</div>
            {!isLocked && !isCompleted && <div className="chapter-cta">Tap to play →</div>}
            {isCompleted && <div className="chapter-done-label">Done!</div>}
        </div>
    );
}
