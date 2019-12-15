import React, { useState } from 'react';

import './App.css';
import GameGrid from './components/game-grid';

const difficulties = {
  EASY: 0.1,
  MEDIUM: 0.2,
  HARD: 0.35,
};

const App: React.FC = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header" data-testid="header">
        <h1>Minesweeper</h1>
        <div className="Difficulty-buttons">
          <button
            type="button"
            onClick={() => setCurrentDifficulty(difficulties.EASY)}
          >
            A walk in the park
          </button>
          <button
            type="button"
            onClick={() => setCurrentDifficulty(difficulties.MEDIUM)}
          >
            I like a challenge
          </button>
          <button
            type="button"
            onClick={() => setCurrentDifficulty(difficulties.HARD)}
          >
            Kill me please
          </button>
        </div>
      </header>
      {currentDifficulty > 0 && <GameGrid difficulty={currentDifficulty} />}
    </div>
  );
};

export default App;
