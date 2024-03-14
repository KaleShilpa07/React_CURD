import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  test('renders loading spinner', () => {
    // Render the Spinner component
    const { getByAltText } = render(<Spinner />);
    
    // Find the image element by its alt text
    const spinnerImage = getByAltText('Loading');
    
    // Assert that the spinner image is rendered
    expect(spinnerImage).toBeInTheDocument();
  });
});
