import React, { useEffect, useReducer } from 'react';

interface GridProps {
  difficulty: number;
}

interface Action {
  type: string;
  payload?: any;
}

interface Field {
  isBomb: boolean;
  isActive: boolean;
  surroundingBombs?: number;
}

function reducer(state: Array<Array<Field>>, action: Action) {
  switch (action && action.type) {
    case 'INITIALIZE_GAME': {
      const { difficulty } = action.payload;
      const grid: Array<Array<Field>> = [];
      for (let y = 0; y < 25; y++) {
        grid[y] = [];
        for (let x = 0; x < 25; x++) {
          grid[y][x] = {
            isBomb: Math.random() < difficulty,
            isActive: false,
          };
        }
      }
      return grid;
    }
    default:
      return state;
  }
}

const GameGrid: React.FC<GridProps> = ({ difficulty }) => {
  const [grid, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: { difficulty } });
  }, [difficulty]);

  return (
    <div>
      {grid.map(row =>
        row.map(field => <div data-testId="field">{JSON.stringify(field)}</div>)
      )}
    </div>
  );
};

export default GameGrid;
