import React from 'react';
import { useGame } from '../context/GameContext.jsx';
import ChapterCard from './ChapterCard.jsx';
import './LevelMap.css';

const LEVEL_INFO = [
    {
        num: 1,
        title: 'Basics of Money',
        tagline: '💡 Learn what money is, how to save & spend wisely!',
        emoji: '🌱',
        color: '#6c63ff',
    },
    {
        num: 2,
        title: 'Investment Decisions',
        tagline: '📈 Discover how to grow your money with smart investments!',
        emoji: '📈',
        color: '#ff6b6b',
    },
    {
        num: 3,
        title: 'Smart Spending & Values',
        tagline: '🌟 Learn to spend smartly and value what truly matters!',
        emoji: '🌟',
        color: '#f59e0b',
    },
];


export default function LevelMap({ onSelectChapter }) {
    const { chapters, state, getLevelStatus } = useGame();

    return (
        <div className="level-map">
            {LEVEL_INFO.map((lv, idx) => {
                const lvStatus = getLevelStatus(lv.num);
                const lvChapters = chapters.filter(c => c.level === lv.num);
                const accessible = lv.num === 1 || getLevelStatus(lv.num - 1).complete;
                const isLast = idx === LEVEL_INFO.length - 1;

                return (
                    <React.Fragment key={lv.num}>
                        <section className={`level-section ${!accessible ? 'level-locked' : ''}`}>
                            <div className="level-header" style={{ '--lv-color': lv.color }}>
                                <span className="level-emoji">{lv.emoji}</span>
                                <div className="level-header-text">
                                    <div className="level-label">Level {lv.num}</div>
                                    <h3 className="level-title">{lv.title}</h3>
                                    <span className="level-tagline">{lv.tagline}</span>
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

                    </React.Fragment>
                );
            })}
        </div>
    );
}

