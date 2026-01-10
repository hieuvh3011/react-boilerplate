import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { Layout } from './Layout';

// Mock Header component
vi.mock('../Header/Header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}));

describe('Layout Component', () => {
  it('renders children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const content = screen.getByTestId('layout-content');
    expect(content).toHaveTextContent('Test Content');
  });

  it('renders Header component', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('applies correct layout structure', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const layoutDiv = screen.getByTestId('layout');
    expect(layoutDiv).toHaveClass('min-h-screen');
    expect(layoutDiv).toHaveClass('flex');
    expect(layoutDiv).toHaveClass('flex-col');
  });

  it('applies correct main element classes', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const main = screen.getByTestId('layout-content');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveClass('max-w-7xl');
  });

  it('renders multiple children', () => {
    render(
      <Layout>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </Layout>
    );

    const content = screen.getByTestId('layout-content');
    expect(content).toHaveTextContent('First Child');
    expect(content).toHaveTextContent('Second Child');
    expect(content).toHaveTextContent('Third Child');
  });

  it('wraps content in main element', () => {
    render(
      <Layout>
        <div data-testid="content">Content</div>
      </Layout>
    );

    const content = screen.getByTestId('content');
    const main = screen.getByTestId('layout-content');

    expect(main).toContainElement(content);
  });
});
