import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext.jsx';
import HUD from './HUD.jsx';
import LevelMap from './LevelMap.jsx';
import ChapterModal from './ChapterModal.jsx';
import Leaderboard from './Leaderboard.jsx';
import GameOver from './GameOver.jsx';
import LevelCompleteModal from './LevelCompleteModal.jsx';
import './GameScreen.css';

export default function GameScreen() {
    const { state, isGameOver } = useGame();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [celebratingLevel, setCelebratingLevel] = useState(null);

    // Track previous level to detect level-up
    const prevLevelRef = useRef(state.level);
    const prevCompletedRef = useRef(state.completedChapters.length);

    useEffect(() => {
        const prevLevel = prevLevelRef.current;
        const currentLevel = state.level;
        const prevCompleted = prevCompletedRef.current;
        const currentCompleted = state.completedChapters.length;

        // Level increased → a level was just completed
        if (currentLevel > prevLevel && currentCompleted > prevCompleted) {
            setCelebratingLevel(prevLevel); // show celebration for the level that was completed
        }

        // Edge case: Level 3 all done (isGameOver) but level stays at 3
        // Detect by checking if all 15 chapters just completed
        if (currentCompleted === 15 && prevCompleted === 14) {
            setCelebratingLevel(3);
        }

        prevLevelRef.current = currentLevel;
        prevCompletedRef.current = currentCompleted;
    }, [state.level, state.completedChapters.length]);

    if (isGameOver && celebratingLevel === null) {
        return <GameOver onLeaderboard={() => setShowLeaderboard(true)} />;
    }

    return (
        <div className="game-screen">
            <HUD onLeaderboard={() => setShowLeaderboard(true)} />

            <main className="game-main">
                <div className="game-intro fade-up">
                    <h2>Welcome aboard, {state.username}! 🚀</h2>
                    <p className="game-tagline">"Rupee in Pocket, Ride like Rocket!" — Complete chapters in order to unlock more!</p>
                </div>

                <LevelMap onSelectChapter={setSelectedChapter} />
            </main>

            {selectedChapter && (
                <ChapterModal
                    chapter={selectedChapter}
                    onClose={() => setSelectedChapter(null)}
                />
            )}

            {showLeaderboard && (
                <Leaderboard onClose={() => setShowLeaderboard(false)} />
            )}

            {celebratingLevel !== null && (
                <LevelCompleteModal
                    completedLevel={celebratingLevel}
                    onClose={() => {
                        setCelebratingLevel(null);
                        // If game is over, show game over after celebration closes
                    }}
                />
            )}
        </div>
    );
}
