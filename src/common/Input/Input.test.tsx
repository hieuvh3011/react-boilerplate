import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('renders with label', () => {
    render(<Input label="Email" id="email" />);
    const label = screen.getByTestId('input-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Email');
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Input label="Password" required />);
    const label = screen.getByTestId('input-label');
    expect(label).toHaveTextContent('*');
  });

  it('renders with error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    const error = screen.getByTestId('input-error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('Invalid email');
  });

  it('applies error styling when error prop is provided', () => {
    render(<Input error="Error message" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-danger');
  });

  it('renders with helper text', () => {
    render(<Input helperText="Enter your email address" />);
    const helper = screen.getByTestId('input-helper');
    expect(helper).toBeInTheDocument();
    expect(helper).toHaveTextContent('Enter your email address');
  });

  it('does not show helper text when error is present', () => {
    render(<Input helperText="Helper text" error="Error message" />);
    expect(screen.queryByTestId('input-helper')).not.toBeInTheDocument();
    expect(screen.getByTestId('input-error')).toHaveTextContent(
      'Error message'
    );
  });

  it('renders full width by default', () => {
    render(<Input />);
    const container = screen.getByTestId('input-container');
    expect(container).toHaveClass('w-full');
  });

  it('can be rendered without full width', () => {
    render(<Input fullWidth={false} />);
    const container = screen.getByTestId('input-container');
    expect(container).not.toHaveClass('w-full');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByTestId('input') as HTMLInputElement;

    await user.type(input, 'Hello World');
    expect(input.value).toBe('Hello World');
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);
    const input = screen.getByTestId('input');

    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    const emailInput = screen.getByTestId('input');
    expect(emailInput).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    const passwordInput = screen.getByTestId('input');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-input');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional HTML input attributes', () => {
    render(
      <Input placeholder="Test" maxLength={10} data-testid="custom-input" />
    );
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
