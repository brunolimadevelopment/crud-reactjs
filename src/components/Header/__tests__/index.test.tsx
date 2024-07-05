import { render, screen } from '@testing-library/react';
import Header from '../index';
import '@testing-library/jest-dom'; 

jest.mock('../../../src/assets/vite.svg', () => ({
  ReactComponent: () => <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17l-4-5 1.5-1.5L11 15.085V7h2v8.085l2.5-4.585L17 14l-4 5z" fill="#000000" /></svg>,
}));

describe('Header Component', () => {
  it('renders logo image with correct alt text', () => {
    render(<Header />);

    const logoImage = screen.getByAltText('Client CRUD');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src');
  });
});
