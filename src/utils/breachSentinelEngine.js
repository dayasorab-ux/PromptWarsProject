/**
 * Data Breach Sentinel & Password Entropy Audit Engine
 * Simulates credential exposure database checks and performs cryptographic password strength analysis.
 */

// Simulated Breach Database (Realistic sample datasets)
const BREACH_DATABASE = [
  {
    name: 'Canva Global Data Exposure (2024)',
    domain: 'canva.com',
    date: '2024-03-15',
    exposedData: ['Email addresses', 'Hashed Passwords (bcrypt)', 'Usernames', 'Geographic Locations'],
    recordCount: '137 Million',
    riskLevel: 'HIGH',
    description: 'An unauthorized third party accessed backend databases containing user account metadata and hashed credentials.'
  },
  {
    name: 'Apollo Customer Intelligence Breach',
    domain: 'apollo.io',
    date: '2023-11-20',
    exposedData: ['Email addresses', 'Phone numbers', 'Job Titles', 'Social Profiles', 'Employer Data'],
    recordCount: '126 Million',
    riskLevel: 'MEDIUM',
    description: 'Publicly exposed API endpoint revealed sales contact information and professional identity metadata.'
  },
  {
    name: 'Global E-Commerce & Retail Leak',
    domain: 'shop-global.com',
    date: '2023-08-04',
    exposedData: ['Email addresses', 'Plaintext Billing Addresses', 'Phone Numbers', 'Partial Credit Card Digits'],
    recordCount: '45 Million',
    riskLevel: 'CRITICAL',
    description: 'Misconfigured cloud storage bucket exposed database dumps containing customer billing data.'
  },
  {
    name: 'FinTech Payment Portal Breach',
    domain: 'pay-service.io',
    date: '2024-01-10',
    exposedData: ['Email addresses', 'IP Logs', 'Authentication Tokens', 'Transaction Identifiers'],
    recordCount: '18 Million',
    riskLevel: 'HIGH',
    description: 'OAuth token leak allowed temporary unauthorized API session access before containment.'
  }
];

// Common exposed password list for instant dictionary detection
const COMMON_WEAK_PASSWORDS = [
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty', '111111',
  'iloveyou', 'adobe123', 'admin', 'welcome', 'monkey', 'dragon', 'password123',
  '123123', 'sunshine', 'letmein', 'princess', 'football', 'charlie', 'donald'
];

/**
 * Checks email exposure against simulated breach dataset
 */
export function checkEmailBreaches(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address (e.g., alex@company.com).');
  }

  const cleanEmail = email.trim().toLowerCase();
  
  // Deterministic seed simulation based on email string hash so test inputs give realistic reproducible outcomes
  let hashSum = 0;
  for (let i = 0; i < cleanEmail.length; i++) {
    hashSum += cleanEmail.charCodeAt(i);
  }

  const breachCount = (hashSum % 3) + 1; // 1 to 3 breaches
  const matchedBreaches = BREACH_DATABASE.slice(0, breachCount);

  const exposedFields = Array.from(new Set(matchedBreaches.flatMap(b => b.exposedData)));

  return {
    email: cleanEmail,
    isPwned: matchedBreaches.length > 0,
    breachCount: matchedBreaches.length,
    matchedBreaches,
    exposedFields,
    riskScore: Math.min(matchedBreaches.length * 30 + 15, 95),
    recommendations: [
      'Immediately change passwords for any account sharing credentials with these services.',
      'Enable Hardware / App-based 2-Factor Authentication (TOTP, FIDO2/YubiKey) across all financial & email accounts.',
      'Use an encrypted Password Manager (Bitwarden, 1Password) to generate unique 20+ character passwords for every site.',
      'Monitor your credit score and financial statements for unauthorized inquiries.'
    ]
  };
}

/**
 * Analyzes Password Entropy & Crack Time
 */
export function analyzePasswordStrength(pwd) {
  if (!pwd) {
    return {
      length: 0,
      entropyBits: 0,
      crackTimeFormatted: '0 seconds',
      score: 0,
      status: 'VERY WEAK',
      color: '#ff0844',
      feedback: ['Enter a password to evaluate strength.']
    };
  }

  const len = pwd.length;
  let poolSize = 0;

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSymbol) poolSize += 33;

  // Calculate Entropy = len * log2(poolSize)
  const entropyBits = Math.round(len * Math.log2(poolSize || 1));

  // Estimate crack time assuming 100 Billion guesses/sec (GPU cluster)
  const totalCombinations = Math.pow(poolSize, len);
  const guessesPerSecond = 100000000000; // 100 Billion / sec
  const secondsToCrack = totalCombinations / guessesPerSecond;

  const isCommon = COMMON_WEAK_PASSWORDS.includes(pwd.toLowerCase());
  const feedback = [];

  if (isCommon) {
    feedback.push('CRITICAL WARNING: This password appears on known public breach dictionaries! It can be cracked in under 1 millisecond.');
  }

  if (len < 10) {
    feedback.push('Password is shorter than recommended 12+ characters.');
  }
  if (!hasUpper) feedback.push('Add uppercase letters (A-Z).');
  if (!hasDigit) feedback.push('Add numerical digits (0-9).');
  if (!hasSymbol) feedback.push('Add special symbols (!@#$%^&*).');

  let score = Math.min(Math.round((entropyBits / 80) * 100), 100);
  if (isCommon) score = 5;

  let status = 'VERY WEAK';
  let color = '#ff0844';

  if (score >= 80 && !isCommon) {
    status = 'ENTERPRISE STRENGTH / HARDENED';
    color = '#00e676';
  } else if (score >= 55 && !isCommon) {
    status = 'MODERATE / ACCEPTABLE';
    color = '#ffb100';
  } else if (score >= 35 && !isCommon) {
    status = 'WEAK / VULNERABLE';
    color = '#ff7b00';
  }

  return {
    length: len,
    entropyBits,
    crackTimeFormatted: formatCrackTime(secondsToCrack, isCommon),
    score,
    status,
    color,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    isCommon,
    feedback
  };
}

function formatCrackTime(seconds, isCommon) {
  if (isCommon || seconds < 1) return 'Instant (< 1 millisecond)';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
  return 'Over 1,000+ Centuries (Quantum Resistant)';
}
