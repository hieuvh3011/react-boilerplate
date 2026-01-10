import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with default variant (primary)', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-primary');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('renders with danger variant', () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-danger');
  });

  it('renders with small size', () => {
    render(<Button size="small">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-xs');
  });

  it('renders with medium size (default)', () => {
    render(<Button size="medium">Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-sm');
  });

  it('renders with large size', () => {
    render(<Button size="large">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-base');
  });

  it('renders full width when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('does not render full width by default', () => {
    render(<Button>Normal Width</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('w-full');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not trigger onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through additional HTML button attributes', () => {
    render(
      <Button type="submit" data-testid="submit-btn">
        Submit
      </Button>
    );
    const button = screen.getByTestId('submit-btn');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('combines multiple props correctly', () => {
    render(
      <Button variant="danger" size="large" fullWidth className="extra-class">
        Combined Props
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-danger');
    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('extra-class');
  });
});
