import React, { useRef, useEffect, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import './ChapterCard.css';

export default function ChapterCard({ chapter, onSelect }) {
    const { state, isChapterUnlocked } = useGame();
    const isCompleted = state.completedChapters.includes(chapter.id);
    const isUnlocked = isChapterUnlocked(chapter.id);
    const isLocked = !isUnlocked;

    // Detect locked → unlocked transition to trigger 3D pop animation
    const wasLockedRef = useRef(isLocked);
    const [justUnlocked, setJustUnlocked] = useState(false);

    useEffect(() => {
        if (wasLockedRef.current && !isLocked) {
            // Transitioned from locked → unlocked!
            setJustUnlocked(true);
            const t = setTimeout(() => setJustUnlocked(false), 900);
            return () => clearTimeout(t);
        }
        wasLockedRef.current = isLocked;
    }, [isLocked]);

    const handleClick = () => {
        if (!isLocked) onSelect();
    };

    let cardClass = 'chapter-card';
    if (isCompleted) cardClass += ' chapter-done';
    if (isLocked) cardClass += ' chapter-locked';
    if (!isLocked && !isCompleted) cardClass += ' chapter-playable';
    if (justUnlocked) cardClass += ' chapter-just-unlocked';

    return (
        <div
            className={cardClass}
            onClick={handleClick}
            title={isLocked ? 'Complete the previous chapter first!' : chapter.title}
        >
            {justUnlocked && (
                <div className="unlock-burst" aria-hidden="true">
                    {['🎉', '⭐', '✨', '🚀', '💫'].map((e, i) => (
                        <span key={i} className="burst-emoji" style={{ '--bi': i }}>{e}</span>
                    ))}
                </div>
            )}
            <div className="chapter-num">Ch. {chapter.id}</div>
            <div className="chapter-emoji">{isLocked ? '🔒' : isCompleted ? '✅' : chapter.emoji}</div>
            <div className="chapter-title">{chapter.title}</div>
            {!isLocked && !isCompleted && <div className="chapter-cta">Tap to play →</div>}
            {isCompleted && <div className="chapter-done-label">Done! 🌟</div>}
        </div>
    );
}

