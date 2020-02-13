import React from 'react';
import { render } from '@testing-library/react';
import { SaveTripButton } from '../Components/SaveTripButton/SaveTripButton';


test("renders SavedTrip button", () => {
const { getByText } = render(<SaveTripButton/>);
    const button = getByText('Save Trip');
    expect(button).toBeInTheDocument();
});