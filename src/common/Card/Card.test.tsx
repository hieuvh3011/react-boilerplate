import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children content', () => {
    render(<Card>Card content</Card>);
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveTextContent('Card content');
  });

  it('renders with title', () => {
    render(<Card title="Card Title">Content</Card>);
    const title = screen.getByTestId('card-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Card Title');
  });

  it('renders with description', () => {
    render(<Card description="Card description">Content</Card>);
    const description = screen.getByTestId('card-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Card description');
  });

  it('renders with both title and description', () => {
    render(
      <Card title="Title" description="Description">
        Content
      </Card>
    );
    expect(screen.getByTestId('card-title')).toHaveTextContent('Title');
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'Description'
    );
  });

  it('renders footer content', () => {
    render(<Card footer={<button type="button">Action</button>}>Content</Card>);
    const footer = screen.getByTestId('card-footer');
    expect(footer).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies interactive styling when interactive prop is true', () => {
    render(<Card interactive>Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('does not apply interactive styling by default', () => {
    render(<Card>Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('handles click events when interactive', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Card interactive onClick={handleClick}>
        Content
      </Card>
    );
    const card = screen.getByTestId('card');

    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-card');
  });

  it('renders complete card with all props', () => {
    render(
      <Card
        title="Complete Card"
        description="This is a complete card"
        footer={<button type="button">Submit</button>}
        interactive
        className="extra-class"
      >
        Main content here
      </Card>
    );

    expect(screen.getByTestId('card-title')).toHaveTextContent('Complete Card');
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'This is a complete card'
    );
    expect(screen.getByTestId('card-content')).toHaveTextContent(
      'Main content here'
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders without title and description', () => {
    render(<Card>Just content</Card>);
    const content = screen.getByTestId('card-content');
    expect(content).toHaveTextContent('Just content');
    // Ensure the title/description elements are not rendered
    expect(screen.queryByTestId('card-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-description')).not.toBeInTheDocument();
  });

  it('passes through additional HTML div attributes', () => {
    render(<Card data-testid="custom-card">Content</Card>);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });

  it('renders complex footer content', () => {
    const footer = (
      <div>
        <button type="button">Cancel</button>
        <button type="button">Submit</button>
      </div>
    );

    render(<Card footer={footer}>Content</Card>);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
