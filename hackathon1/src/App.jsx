import React from 'react';
import { GameProvider, useGame } from './context/GameContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import GameScreen from './components/GameScreen.jsx';
import './index.css';

function AppInner() {
  const { state } = useGame();
  return state.username ? <GameScreen /> : <LoginPage />;
}

export default function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  );
}
