import React, { useState, useRef, useEffect } from 'react';
import { PaperPlaneRight, Microphone, Stop } from '@phosphor-icons/react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) setTimeout(() => setIsRecording(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto relative">
      <div className="relative flex items-end gap-2 bg-white border border-[var(--border-default)] p-2 rounded-xl shadow-[var(--shadow-md)]">
        <button type="button" onClick={toggleRecording} disabled={isLoading}
          className={`p-3 rounded-lg flex-shrink-0 transition-colors ${isRecording ? 'bg-red-50 text-[var(--error)] animate-pulse' : 'text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-secondary)]'}`}
          aria-label={isRecording ? "Stop recording" : "Start voice input"}>
          {isRecording ? <Stop size={24} weight="fill" /> : <Microphone size={24} />}
        </button>
        <textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder={isRecording ? "Listening..." : "Ask ElectIQ about the election process..."}
          disabled={isLoading || isRecording} rows={1}
          className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] py-3 px-2 resize-none focus:outline-none focus:ring-0 max-h-[120px] text-[15px]" />
        <button type="submit" disabled={!input.trim() || isLoading}
          className="p-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg flex-shrink-0 disabled:opacity-40 disabled:hover:bg-[var(--accent)] transition-colors"
          aria-label="Send message">
          <PaperPlaneRight size={24} weight="fill" />
        </button>
      </div>
      <div className="text-center mt-2 text-xs text-[var(--text-muted)]">
        ElectIQ uses AI to provide neutral civic information. Always verify critical dates with the ECI.
      </div>
    </form>
  );
}
