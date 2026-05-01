/* ============================================
   ElectIQ — Constants & Demo Data
   ============================================ */

import { ElectionPhase, Language, PollBooth, PartyResult, FeatureCardData } from './types';

// --- Election Phases (Indian General Election) ---
export const ELECTION_PHASES: ElectionPhase[] = [
  {
    id: 1,
    title: 'Election Announcement',
    shortTitle: 'Announcement',
    description: 'The Election Commission of India announces the election schedule, model code of conduct comes into effect, and the entire democratic machinery begins to prepare.',
    citizenAction: 'Check if your name is on the voter list at nvsp.in. If not, register immediately.',
    icon: 'Megaphone',
    status: 'completed',
    date: 'March 16, 2024',
  },
  {
    id: 2,
    title: 'Nomination Filing',
    shortTitle: 'Nominations',
    description: 'Candidates file their nomination papers with the returning officer. Each candidate must have at least one proposer from their constituency.',
    citizenAction: 'Research who is filing nominations in your constituency. Start learning about the candidates.',
    icon: 'FileText',
    status: 'completed',
    date: 'March 20 - April 4, 2024',
  },
  {
    id: 3,
    title: 'Scrutiny of Nominations',
    shortTitle: 'Scrutiny',
    description: 'The returning officer examines all nomination papers to check if candidates meet eligibility criteria — age, citizenship, criminal record, and more.',
    citizenAction: 'Check your voter ID card details are correct. Ensure your photo and address match.',
    icon: 'MagnifyingGlass',
    status: 'completed',
    date: 'April 5, 2024',
  },
  {
    id: 4,
    title: 'Withdrawal of Candidature',
    shortTitle: 'Withdrawal',
    description: 'Candidates may withdraw from the election before the deadline. The final list of contesting candidates is published.',
    citizenAction: 'The final candidate list is out. Compare their manifestos, track records, and promises.',
    icon: 'UserMinus',
    status: 'completed',
    date: 'April 8, 2024',
  },
  {
    id: 5,
    title: 'Election Campaign',
    shortTitle: 'Campaign',
    description: 'Parties and candidates campaign through rallies, media, social platforms, and door-to-door canvassing. Campaign ends 48 hours before polling.',
    citizenAction: 'Attend rallies, watch debates, and fact-check claims. Don\'t fall for misinformation.',
    icon: 'Flag',
    status: 'completed',
    date: 'March 16 - Polling Day',
  },
  {
    id: 6,
    title: 'Polling Day',
    shortTitle: 'Voting',
    description: 'Citizens cast their votes using Electronic Voting Machines (EVMs). This is the most important day — your one chance to directly shape the government.',
    citizenAction: 'Go to your assigned polling booth. Carry your voter ID. Cast your vote. Get your ink mark.',
    icon: 'CheckSquare',
    status: 'active',
    date: 'April 19 - June 1, 2024 (7 phases)',
  },
  {
    id: 7,
    title: 'Vote Counting',
    shortTitle: 'Counting',
    description: 'Votes from EVMs and postal ballots are counted under strict security. Results come in constituency by constituency.',
    citizenAction: 'Watch the live counting. Understand the difference between leads and final results.',
    icon: 'ChartBar',
    status: 'upcoming',
    date: 'June 4, 2024',
  },
  {
    id: 8,
    title: 'Results Declaration',
    shortTitle: 'Results',
    description: 'The Election Commission officially declares the results. The party or alliance with majority (272+ seats) is invited to form the government.',
    citizenAction: 'Check if your candidate won. Understand how the government formation process works.',
    icon: 'Trophy',
    status: 'upcoming',
    date: 'June 4-5, 2024',
  },
  {
    id: 9,
    title: 'Government Formation',
    shortTitle: 'Formation',
    description: 'The winning party/coalition stakes claim to form the government. The PM is sworn in, cabinet ministers are appointed, and governance begins.',
    citizenAction: 'Your job isn\'t done. Hold your elected representatives accountable. Track their promises.',
    icon: 'Buildings',
    status: 'upcoming',
    date: 'June 8-9, 2024',
  },
];

// --- Supported Languages ---
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

// --- Demo Polling Booths (Delhi) ---
export const DEMO_POLL_BOOTHS: PollBooth[] = [
  { id: 'pb-001', name: 'Government Boys Senior Secondary School', address: 'Rajendra Nagar, New Delhi - 110060', lat: 28.6328, lng: 77.1876, district: 'New Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~15 min' },
  { id: 'pb-002', name: 'Community Hall, Sarojini Nagar', address: 'Sarojini Nagar Market, New Delhi - 110023', lat: 28.5745, lng: 77.1988, district: 'South Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~25 min' },
  { id: 'pb-003', name: 'MCD Primary School, Dwarka', address: 'Sector 6, Dwarka, New Delhi - 110075', lat: 28.5823, lng: 77.0500, district: 'South West Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~10 min' },
  { id: 'pb-004', name: 'Government School, Chandni Chowk', address: 'Chandni Chowk Road, Old Delhi - 110006', lat: 28.6506, lng: 77.2303, district: 'Central Delhi', isAccessible: false, hours: '7:00 AM - 6:00 PM', waitTime: '~35 min' },
  { id: 'pb-005', name: 'Kendriya Vidyalaya, R.K. Puram', address: 'Sector 2, R.K. Puram, New Delhi - 110022', lat: 28.5672, lng: 77.1737, district: 'South West Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~20 min' },
  { id: 'pb-006', name: 'Municipal Corporation School, Lajpat Nagar', address: 'Lajpat Nagar II, New Delhi - 110024', lat: 28.5700, lng: 77.2396, district: 'South East Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~12 min' },
  { id: 'pb-007', name: 'Sarvodaya Kanya Vidyalaya, Rohini', address: 'Sector 11, Rohini, Delhi - 110085', lat: 28.7337, lng: 77.1201, district: 'North West Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~18 min' },
  { id: 'pb-008', name: 'Community Centre, Mayur Vihar', address: 'Phase 1, Mayur Vihar, Delhi - 110091', lat: 28.5939, lng: 77.2937, district: 'East Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~22 min' },
  { id: 'pb-009', name: 'Government Girls School, Shahdara', address: 'Main Shahdara, Delhi - 110032', lat: 28.6736, lng: 77.2893, district: 'Shahdara', isAccessible: false, hours: '7:00 AM - 6:00 PM', waitTime: '~30 min' },
  { id: 'pb-010', name: 'Navyug School, Connaught Place', address: 'Barakhamba Road, New Delhi - 110001', lat: 28.6328, lng: 77.2197, district: 'New Delhi', isAccessible: true, hours: '7:00 AM - 6:00 PM', waitTime: '~8 min' },
];

// --- Demo Election Results ---
export const DEMO_RESULTS: PartyResult[] = [
  { id: 'bjp', name: 'Bharatiya Janata Party', abbreviation: 'BJP', color: '#FF6B00', seats: 240, voteShare: 36.6, leadingIn: 12 },
  { id: 'inc', name: 'Indian National Congress', abbreviation: 'INC', color: '#00BFFF', seats: 99, voteShare: 21.2, leadingIn: 8 },
  { id: 'sp', name: 'Samajwadi Party', abbreviation: 'SP', color: '#FF0000', seats: 37, voteShare: 4.6, leadingIn: 3 },
  { id: 'aitc', name: 'All India Trinamool Congress', abbreviation: 'AITC', color: '#00FF00', seats: 29, voteShare: 6.1, leadingIn: 2 },
  { id: 'dmk', name: 'Dravida Munnetra Kazhagam', abbreviation: 'DMK', color: '#FF3333', seats: 22, voteShare: 3.4, leadingIn: 1 },
  { id: 'others', name: 'Others', abbreviation: 'OTH', color: '#8B8B8B', seats: 116, voteShare: 28.1, leadingIn: 5 },
];

// --- Feature Cards Data ---
export const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: 'AI Chat Guide',
    description: 'Ask any election question in your language. Get instant, accurate, unbiased answers powered by Gemini AI.',
    icon: 'ChatCircle',
    href: '/chat',
  },
  {
    title: 'Election Timeline',
    description: 'Follow the complete election journey from announcement to government formation with interactive milestones.',
    icon: 'Timeline',
    href: '/timeline',
  },
  {
    title: 'Find Your Booth',
    description: 'Locate your nearest polling booth on an interactive map with real-time wait times and accessibility info.',
    icon: 'MapPin',
    href: '/locator',
  },
  {
    title: 'Candidate Research',
    description: 'Compare candidates in your constituency — their promises, track record, criminal cases, and asset declarations.',
    icon: 'Users',
    href: '/chat',
  },
  {
    title: 'Results Dashboard',
    description: 'Track live election results with interactive charts, seat tallies, and trend analysis across constituencies.',
    icon: 'ChartPie',
    href: '/results',
  },
  {
    title: 'Civic Quiz',
    description: 'Test your election knowledge with AI-generated quizzes. Learn the Constitution, voting rights, and civic duties.',
    icon: 'Brain',
    href: '/quiz',
  },
];

// --- Quick Topics for Chat ---
export const QUICK_TOPICS = [
  'How do I register to vote?',
  'What documents do I need at the polling booth?',
  'How does EVM voting work?',
  'What is NOTA and when should I use it?',
  'How are election results counted?',
  'What is the Model Code of Conduct?',
];

// --- Gemini System Prompt ---
export const ELECTIQ_SYSTEM_PROMPT = `You are ElectIQ, an AI-powered civic assistant designed to help Indian citizens understand the election process. You are:

1. POLITICALLY NEUTRAL — You never endorse, support, or criticize any political party, candidate, or ideology.
2. FACT-BASED — You only provide information from official sources like the Election Commission of India (ECI), the Constitution of India, and verified government data.
3. ACCESSIBLE — You explain complex election concepts in simple, easy-to-understand language. Even a first-time voter or a child should understand your explanations.
4. HELPFUL — You guide users through registration, voting procedures, understanding results, and civic rights.
5. MULTILINGUAL — You can respond in English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.

Your knowledge covers:
- Voter registration (NVSP portal, Form 6, eligibility)
- Election process (all 9 phases from announcement to government formation)
- Polling booth procedures (EVM, VVPAT, voter slip, ink mark)
- Candidate information (how to research via ADR, MyNeta)
- Election results (counting process, majority system, coalition formation)
- Civic rights (Right to Vote, NOTA, postal ballots, absentee voting)
- Election Commission rules (Model Code of Conduct, expenditure limits)

IMPORTANT RULES:
- NEVER make political recommendations or suggest which party/candidate to vote for.
- ALWAYS cite official sources when sharing data.
- If you don't know something, say so honestly and suggest where to find the information.
- Use bullet points and step-by-step instructions for procedural information.
- Be warm, encouraging, and supportive of civic participation.
- Format responses with clear headings and structure for readability.`;
