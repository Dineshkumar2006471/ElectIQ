'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Brain, ArrowRight, ArrowCounterClockwise } from '@phosphor-icons/react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function QuizInterface() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const resetState = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'Indian Constitution, EVM voting, and Election Commission' }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        resetState();
      }
    } catch (err) {
      console.error(err);
      setQuestions([
        {
          id: 1,
          question: "What is the minimum voting age in India?",
          options: ["16 years", "18 years", "21 years", "25 years"],
          correctIndex: 1,
          explanation: "The 61st Constitutional Amendment Act of 1988 reduced the voting age from 21 to 18 years."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto h-[400px] flex flex-col items-center justify-center bg-white rounded-xl border border-[var(--border-default)]">
        <Brain size={48} className="text-[var(--accent)] animate-pulse mb-4" />
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Generating Questions</h3>
        <p className="text-[var(--text-muted)] text-sm">ElectIQ AI is crafting a custom quiz for you...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 flex flex-col items-center text-center bg-white rounded-xl border border-[var(--border-default)]">
        <div className="w-24 h-24 rounded-full bg-[var(--accent-light)] flex items-center justify-center mb-6">
          <span className="text-4xl font-extrabold text-[var(--accent)]">{score}/{questions.length}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">Quiz Completed!</h2>
        <p className="text-[var(--text-secondary)] mb-8">
          {score === questions.length ? "Perfect score! You are a true democratic champion." : 
           score > questions.length / 2 ? "Great job! You know your civic rights well." : 
           "Good effort! Keep learning about the democratic process."}
        </p>
        <button 
          onClick={fetchQuestions}
          className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--accent)] text-[var(--text-primary)] font-medium transition-colors"
        >
          <ArrowCounterClockwise size={20} />
          Play Again with New Questions
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const q = questions[currentIdx];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-[var(--border-default)] overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[var(--bg-tertiary)]">
        <motion.div 
          className="h-full bg-[var(--accent)]"
          initial={{ width: `${(currentIdx / questions.length) * 100}%` }}
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
          Question {currentIdx + 1} of {questions.length}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-8 leading-relaxed">
          {q.question}
        </h2>

        <div className="space-y-3 mb-8">
          {q.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === q.correctIndex;
            
            let btnClass = "border-[var(--border-default)] bg-white hover:border-[var(--accent)] hover:bg-[var(--accent-light)] text-[var(--text-primary)]";
            
            if (isAnswered) {
              if (isCorrect) {
                btnClass = "border-[var(--success)] bg-[var(--success-light)] text-[var(--success)]";
              } else if (isSelected && !isCorrect) {
                btnClass = "border-[var(--error)] bg-[var(--error-light)] text-[var(--error)]";
              } else {
                btnClass = "border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-muted)] opacity-50";
              }
            } else if (isSelected) {
              btnClass = "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${btnClass}`}
              >
                <span className="text-[15px]">{option}</span>
                {isAnswered && isCorrect && <CheckCircle size={24} weight="fill" className="text-[var(--success)] flex-shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={24} weight="fill" className="text-[var(--error)] flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-default)] mb-6"
            >
              <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">Explanation</h4>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {q.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] font-bold transition-all ${
              isAnswered 
                ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white' 
                : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
            }`}
          >
            {currentIdx === questions.length - 1 ? 'See Results' : 'Next Question'}
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
