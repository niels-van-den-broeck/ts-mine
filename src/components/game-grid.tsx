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

function reducer(state: Array<Field>, action: Action) {
  switch (action && action.type) {
    case 'INiTIALIZE_GAME': {
      const { difficulty } = action.payload;
      const grid: Array<Array<Field>> = [];
      for (let y = 0; y < 50; y++) {
        grid[y] = [];
        for (let x = 0; x < 50; x++) {
          grid[y][x] = {
            isBomb: Math.random() > difficulty,
            isActive: false,
          };
        }
      }
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

  return <div data-testid={`game${difficulty}`}></div>;
};

export default GameGrid;
