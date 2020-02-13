import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from "./../Components/Header/Header";

test('renders', () => {
    render(<Header />)
})

test('renders Register button', () => {
    const { getByText } = render(<Header />);
    const button = getByText('Register');
    expect(button).toBeInTheDocument();
})

test('renders Login button', () => {
    const { getByText } = render(<Header />);
    const button = getByText('Login');
    expect(button).toBeInTheDocument();
})

test('input works', () => {
    const { getByPlaceholderText } = render(<Header />);
    const input = getByPlaceholderText('Enter username')
    fireEvent.change(input, {target: {value: 'kbehnken'}})
    expect(input.value).toBe('kbehnken')
})