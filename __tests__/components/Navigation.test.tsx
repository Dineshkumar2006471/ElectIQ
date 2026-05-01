import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '@/components/Navigation';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...rest }: any) => <a href={href} {...rest}>{children}</a>;
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock framer-motion — proxy-based to handle any motion.* component
jest.mock('framer-motion', () => {
  const React = require('react');
  const createMotionProxy = () =>
    new Proxy(
      {},
      {
        get: (_target: any, prop: string) => {
          return React.forwardRef((props: any, ref: any) => {
            const { children, initial, animate, exit, transition, whileHover, whileTap, layoutId, variants, ...rest } = props;
            return React.createElement(prop, { ref, ...rest }, children);
          });
        },
      }
    );
  return {
    motion: createMotionProxy(),
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock @phosphor-icons/react
jest.mock('@phosphor-icons/react', () => {
  const React = require('react');
  const makeIcon = (name: string) => (props: any) => React.createElement('span', { 'data-testid': `icon-${name}`, ...props });
  return {
    List: makeIcon('list'),
    X: makeIcon('x'),
    ChatCircle: makeIcon('chat'),
    Translate: makeIcon('translate'),
  };
});

describe('Navigation', () => {
  test('renders ElectIQ brand name', () => {
    render(<Navigation />);
    expect(screen.getByText('Elect')).toBeInTheDocument();
    expect(screen.getByText('IQ')).toBeInTheDocument();
  });

  test('renders Ask ElectIQ CTA link', () => {
    render(<Navigation />);
    expect(screen.getByText(/Ask ElectIQ/i)).toBeInTheDocument();
  });

  test('renders main navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Candidates')).toBeInTheDocument();
    expect(screen.getByText('Find Booth')).toBeInTheDocument();
  });

  test('navigation has accessible header element', () => {
    const { container } = render(<Navigation />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  test('navigation has nav landmark', () => {
    const { container } = render(<Navigation />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  test('mobile menu toggle button exists', () => {
    render(<Navigation />);
    const menuButton = screen.getByLabelText(/Open menu/i);
    expect(menuButton).toBeInTheDocument();
  });
});
