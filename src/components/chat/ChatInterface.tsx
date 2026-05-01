'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { SuggestionChips } from './SuggestionChips';
import { ChatMessage } from '@/lib/types';
import { Robot, DotsThree } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('electiq_chat_history');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('electiq_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.map(m => ({ role: m.role, content: m.content })).slice(-10), language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get response');
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment.", timestamp: Date.now() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your chat history?')) {
      setMessages([]);
      localStorage.removeItem('electiq_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full max-w-5xl mx-auto pt-4 md:pt-8 px-4 pb-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <Robot size={28} className="text-[var(--accent)]" />
            ElectIQ Assistant
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Your neutral, AI-powered guide to the Indian electoral process.
          </p>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClearHistory} className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--error)] px-3 py-1.5 rounded-lg border border-[var(--border-default)] hover:border-[var(--error)] transition-colors">
            Clear Chat
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 mb-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center pt-10 pb-20">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 rounded-2xl bg-[var(--accent-light)] border border-[var(--accent)]/15 flex items-center justify-center mb-8">
              <Robot size={48} className="text-[var(--accent)]" weight="duotone" />
            </motion.div>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">How can I help you vote?</h2>
            <p className="text-[var(--text-secondary)] text-center max-w-md mb-10">
              I can explain registration, help you find polling booths, or guide you through the election phases.
            </p>
            <SuggestionChips onSelect={handleSendMessage} />
          </div>
        ) : (
          <div className="flex flex-col pb-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center">
                    <Robot size={24} weight="bold" />
                  </div>
                  <div className="p-4 rounded-xl rounded-tl-none bg-white border border-[var(--border-default)] flex items-center h-[52px]">
                    <DotsThree size={32} className="text-[var(--accent)] animate-pulse" weight="bold" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="pt-2">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
