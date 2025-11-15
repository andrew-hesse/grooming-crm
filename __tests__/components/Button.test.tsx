import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

/**
 * Test suite for Button component
 * Ensures button renders correctly with different variants and sizes
 */
describe('Button Component', () => {
  it('renders button with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders button with primary variant', () => {
    render(<Button variant="default">Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders button with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders disabled button', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('renders button with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
  });
});
