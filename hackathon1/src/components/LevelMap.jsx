import React from 'react';
import { useGame } from '../context/GameContext.jsx';
import ChapterCard from './ChapterCard.jsx';
import './LevelMap.css';

const LEVEL_INFO = [
    { num: 1, title: 'Basics of Money', emoji: '🌱', color: '#6c63ff' },
    { num: 2, title: 'Investment Decisions', emoji: '📈', color: '#ff6b6b' },
    { num: 3, title: 'Smart Spending & Values', emoji: '🌟', color: '#ffd93d' },
];

export default function LevelMap({ onSelectChapter }) {
    const { chapters, state, getLevelStatus } = useGame();

    return (
        <div className="level-map">
            {LEVEL_INFO.map(lv => {
                const lvStatus = getLevelStatus(lv.num);
                const lvChapters = chapters.filter(c => c.level === lv.num);
                // A level section is accessible if it's level 1, or previous level is complete
                const accessible = lv.num === 1 || getLevelStatus(lv.num - 1).complete;

                return (
                    <section key={lv.num} className={`level-section ${!accessible ? 'level-locked' : ''}`}>
                        <div className="level-header" style={{ '--lv-color': lv.color }}>
                            <span className="level-emoji">{lv.emoji}</span>
                            <div>
                                <h3>Level {lv.num} — {lv.title}</h3>
                                <span className="level-progress">
                                    {lvStatus.done}/{lvStatus.total} chapters
                                    {lvStatus.complete && ' ✅ Complete!'}
                                </span>
                            </div>
                            {!accessible && <span className="level-lock-badge">🔒 Locked</span>}
                        </div>

                        <div className="chapter-grid">
                            {lvChapters.map(chapter => (
                                <ChapterCard
                                    key={chapter.id}
                                    chapter={chapter}
                                    onSelect={() => onSelectChapter(chapter)}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
