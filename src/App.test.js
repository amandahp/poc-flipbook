import { render, screen } from '@testing-library/react';
import { PDFJS } from 'pdfjs-dist'
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
