import React from 'react';
import { render } from '@testing-library/react';
import {Breweries} from '../Components/Brewery/Brewery';
import { Provider } from 'react-redux';

test('renders back to trip link', () => {
    const { getByText } = render(<Breweries />);
    const link = getByText('Back to trip');
    expect(link).toBeInTheDocument();
    }
)