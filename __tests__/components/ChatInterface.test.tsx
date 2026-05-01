import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatInterface } from '@/components/chat/ChatInterface';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...rest }: any) => <a href={href} {...rest}>{children}</a>;
});

// Mock framer-motion — all motion.* components just render as plain HTML
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
    useAnimation: () => ({ start: jest.fn() }),
    useMotionValue: () => ({ set: jest.fn(), get: jest.fn() }),
  };
});

// Mock @phosphor-icons/react — provide all icons used across ChatInterface + children
jest.mock('@phosphor-icons/react', () => {
  const React = require('react');
  const makeIcon = (name: string) => (props: any) => React.createElement('span', { 'data-testid': `icon-${name}`, ...props });
  return {
    Robot: makeIcon('robot'),
    DotsThree: makeIcon('dots'),
    PaperPlaneRight: makeIcon('send'),
    Microphone: makeIcon('mic'),
    Stop: makeIcon('stop'),
    User: makeIcon('user'),
    IdentificationCard: makeIcon('id'),
    Info: makeIcon('info'),
    MapPin: makeIcon('map'),
    CalendarCheck: makeIcon('calendar'),
    Scales: makeIcon('scales'),
    Users: makeIcon('users'),
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ response: 'You need a Voter ID card to vote.' }),
  })
) as jest.Mock;

describe('ChatInterface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Mock scrollIntoView which is not available in jsdom
    Element.prototype.scrollIntoView = jest.fn();
  });

  test('renders suggestion chips on empty state', () => {
    render(<ChatInterface />);
    expect(screen.getByText(/How do I register to vote/i)).toBeInTheDocument();
  });

  test('renders the ElectIQ Assistant heading', () => {
    render(<ChatInterface />);
    expect(screen.getByText(/ElectIQ Assistant/i)).toBeInTheDocument();
  });

  test('send button is disabled when input is empty', () => {
    render(<ChatInterface />);
    const sendButton = screen.getByLabelText(/Send message/i);
    expect(sendButton).toBeDisabled();
  });

  test('send button enables when user types a message', () => {
    render(<ChatInterface />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'How do I vote?' } });
    const sendButton = screen.getByLabelText(/Send message/i);
    expect(sendButton).not.toBeDisabled();
  });

  test('displays user message after sending', async () => {
    render(<ChatInterface />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'What ID do I need?' } });
    const sendButton = screen.getByLabelText(/Send message/i);
    fireEvent.click(sendButton);
    await waitFor(() => {
      expect(screen.getByText('What ID do I need?')).toBeInTheDocument();
    });
  });

  test('calls fetch API with correct endpoint', async () => {
    render(<ChatInterface />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test question' } });
    fireEvent.click(screen.getByLabelText(/Send message/i));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/chat',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });
});
