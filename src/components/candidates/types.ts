export interface CandidateData {
  name: string;
  type: 'Candidate' | 'Party';
  history: string;
  keyPositions: string[];
  pastPerformance: string;
  manifestoKeywords: string[];
}
