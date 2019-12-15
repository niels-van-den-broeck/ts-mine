import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('minesweeper app', () => {
  test('it renders the header', () => {
    const { getByText } = render(<App />);

    expect(getByText('Minesweeper')).toBeInTheDocument();
  });

  test('it renders the difficulty buttons', () => {
    const { getByText, getAllByTestId } = render(<App />);

    const easy = getByText('A walk in the park');
    const medium = getByText('I like a challenge');
    const hard = getByText('Kill me please');

    fireEvent.click(easy);

    expect(getAllByTestId('field')).toHaveLength(25 * 25);

    fireEvent.click(medium);

    expect(getAllByTestId('field')).toHaveLength(25 * 25);

    fireEvent.click(hard);

    expect(getAllByTestId('field')).toHaveLength(25 * 25);
  });
});
