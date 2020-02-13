import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateTrip from '../Components/CreateTrip/CreateTrip';

test('renders', () => {
  render(<CreateTrip />);
});

test('renders submit button', () => {
  const { getByText } = render(<CreateTrip />);
  const button = getByText('Find Beer');
  expect(button).toBeInTheDocument();
});

test('start city input works', () => {
  const { getByTestId } = render(<CreateTrip />);
  const startCity = getByTestId('start-city');
  fireEvent.change(input, {target: {value: 'denver'}});
  expect(startCity.value).toBe('denver')
});

test('end city input works', () => {
  const { getByTestId } = render(<CreateTrip />);
  const startCity = getByTestId('end-city');
  fireEvent.change(input, {target: {value: 'seattle'}});
  expect(startCity.value).toBe('seattle')
});