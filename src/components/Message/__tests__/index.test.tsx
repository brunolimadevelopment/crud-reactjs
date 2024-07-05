import { render, screen } from '@testing-library/react';
import Message from '../index';
import { MessageProps } from '../../../types/message';

describe('Message Component', () => {
  it('renders success message correctly', () => {
    const successMessage = 'Operation successful';
    const props: MessageProps = { message: successMessage, type: 'success' };

    render(<Message {...props} />);

    const messageElement = screen.getByText(successMessage);
    expect(messageElement).toBeInTheDocument();

    const messageWrapper = messageElement.parentElement;
    expect(messageWrapper).toHaveStyle('background-color: #d4edda');
    expect(messageWrapper).toHaveStyle('color: #155724');
    expect(messageWrapper).toHaveStyle('border: 1px solid #c3e6cb');
  });

  it('renders error message correctly', () => {
    const errorMessage = 'Operation failed';
    const props: MessageProps = { message: errorMessage, type: 'error' };

    render(<Message {...props} />);

    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();

    const messageWrapper = messageElement.parentElement;
    expect(messageWrapper).toHaveStyle('background-color: #f8d7da');
    expect(messageWrapper).toHaveStyle('color: #721c24');
    expect(messageWrapper).toHaveStyle('border: 1px solid #f5c6cb');
  });
});