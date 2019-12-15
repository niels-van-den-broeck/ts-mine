import React, { useEffect, useReducer, useCallback } from 'react';

interface GridProps {
  difficulty: number;
}

interface Action {
  type: string;
  payload?: any;
}

interface Field {
  id: string;
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
            id: `${x}-${y}`,
            isBomb: Math.random() < difficulty,
            isActive: false,
          };
        }
      }

      return grid;
    }
    case 'FIELD_OPENED': {
      const { x, y } = action.payload;
      return state.map((row, currY) =>
        currY === y
          ? row.map((field, currX) =>
              currX === x ? { ...field, isActive: true } : field
            )
          : row
      );
    }
    default:
      return state;
  }
}

const GameGrid: React.FC<GridProps> = ({ difficulty }) => {
  const [grid, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({
      type: 'INITIALIZE_GAME',
      payload: {
        difficulty,
      },
    });
  }, [difficulty]);

  const updateField = useCallback(
    (x: number, y: number) => {
      dispatch({ type: 'FIELD_OPENED', payload: { x, y } });
    },
    [dispatch]
  );

  return (
    <div className="game-container">
      {grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((field, x) => (
            <div
              key={field.id}
              data-testid="field"
              className={`field ${field.isActive ? 'active' : ''}`}
              onClick={() => updateField(x, y)}
            >
              <span>{field.isBomb && 1}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
