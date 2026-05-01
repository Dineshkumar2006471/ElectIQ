/* ============================================
   ElectIQ — Type Definitions
   ============================================ */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  language?: string;
}

export interface ElectionPhase {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  citizenAction: string;
  icon: string;
  status: 'completed' | 'active' | 'upcoming';
  date?: string;
}

export interface PollBooth {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  district: string;
  isAccessible: boolean;
  hours: string;
  waitTime?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  rank: 'Civic Champion' | 'Informed Voter' | 'Rising Citizen' | 'Just Getting Started';
  answers: { questionId: number; selectedIndex: number; correct: boolean }[];
}

export interface PartyResult {
  id: string;
  name: string;
  abbreviation: string;
  color: string;
  seats: number;
  voteShare: number;
  leadingIn: number;
}

export interface FeatureCardData {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface ConversationSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  language: string;
}
