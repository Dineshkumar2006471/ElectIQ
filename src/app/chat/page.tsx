import { Metadata } from 'next';
import Image from 'next/image';
import { ChatInterface } from '@/components/chat/ChatInterface';

export const metadata: Metadata = {
  title: 'Ask ElectIQ | Your Civic AI Guide',
  description: 'Chat with ElectIQ, a neutral AI assistant designed to help you understand the Indian election process.',
};

export default function ChatPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--bg-secondary)] overflow-hidden relative">
      {/* Page hero banner */}
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src="/feature-chat.png"
          alt="AI-powered civic assistant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-4 left-0 right-0 container-narrow">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg">
            Ask ElectIQ
          </h1>
          <p className="text-sm text-white/70 mt-1">Your neutral, AI-powered guide to the Indian electoral process.</p>
        </div>
      </div>
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </main>
  );
}
