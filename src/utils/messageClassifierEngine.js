/**
 * Scam Message & Email Phishing Classifier Engine
 * Analyzes SMS (Smishing), Emails, and Chat messages for psychological manipulation,
 * scam patterns, brand impersonation, and malicious link attachments.
 */

import { analyzeUrl } from './urlAnalyzerEngine.js';

// Psychological manipulation & Urgency trigger patterns
const URGENCY_PATTERNS = [
  { regex: /urgent(ly)?|immediate(ly)?|action required|within \d+ (hours?|mins?|seconds?)/i, weight: 15, label: 'High Urgency Pressure' },
  { regex: /suspended|locked|blocked|terminated|deactivated|closed|restricted/i, weight: 20, label: 'Account Restriction Threat' },
  { regex: /final notice|last chance|penalty|legal action|warrant|police|arrest/i, weight: 25, label: 'Coercive / Legal Threat' },
  { regex: /unauthorized|suspicious (login|activity|access)|unusual activity/i, weight: 15, label: 'Security Alarm Trigger' }
];

// Financial & Prize Scam Patterns
const FINANCIAL_PATTERNS = [
  { regex: /won \$?\d+|congratulations.*(winner|prize|gift|reward|claim)/i, weight: 30, label: 'Lottery / Prize Bait' },
  { regex: /free (bitcoin|crypto|usdt|eth|giftcard|iphone|macbook)/i, weight: 25, label: 'Free Giveaway Bait' },
  { regex: /refund of \$?\d+|overcharged|pending payment of \$?\d+/i, weight: 20, label: 'Fake Refund / Invoice Trap' },
  { regex: /wire transfer|western union|gift card|apple card|steam card/i, weight: 25, label: 'Untraceable Payment Request' },
  { regex: /inheritance|beneficiary|next of kin|million dollars/i, weight: 30, label: 'Advance-Fee / Nigerian Prince Scam' }
];

// Credential & OTP Harvesting Traps
const HARVESTING_PATTERNS = [
  { regex: /(reply|send|text) (back )?with (your )?(code|pin|otp|password)/i, weight: 35, label: '2FA / OTP Theft Request' },
  { regex: /verify your (ssn|social security|identity|dob|credit card)/i, weight: 30, label: 'PII Credential Harvesting' },
  { regex: /click (here|below|this link) to (verify|unlock|confirm|claim)/i, weight: 20, label: 'Call-to-Action Link Trap' }
];

// Tech Support Scam Patterns
const TECH_SUPPORT_PATTERNS = [
  { regex: /call (us|support|helpdesk) (at|on) \+?\d{10,12}|1-\d{3}-\d{3}-\d{4}/i, weight: 25, label: 'Phone Number Callback Scam' },
  { regex: /geek squad|norton|mcafee|windows support|apple support invoice/i, weight: 25, label: 'Fake Subscription / Tech Support Scam' }
];

// Package Delivery Smishing
const DELIVERY_PATTERNS = [
  { regex: /(usps|fedex|dhl|ups|amazon) parcel|package.*(delayed|pending|held|address)/i, weight: 25, label: 'Postal / Parcel Smishing Trap' }
];

/**
 * Main Message Classification Function
 */
export function classifyMessage(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Please enter a message body, SMS text, or email header.');
  }

  const rawText = text.trim();
  let totalScore = 0;
  const detectedTriggers = [];

  // 1. Check Urgency & Psychological Coercion
  URGENCY_PATTERNS.forEach(rule => {
    if (rule.regex.test(rawText)) {
      totalScore += rule.weight;
      detectedTriggers.push({
        category: 'Psychological Manipulation',
        level: 'WARNING',
        label: rule.label,
        weight: rule.weight
      });
    }
  });

  // 2. Check Financial & Prize Bait
  FINANCIAL_PATTERNS.forEach(rule => {
    if (rule.regex.test(rawText)) {
      totalScore += rule.weight;
      detectedTriggers.push({
        category: 'Scam Vector',
        level: 'DANGER',
        label: rule.label,
        weight: rule.weight
      });
    }
  });

  // 3. Check Credential & OTP Harvesting
  HARVESTING_PATTERNS.forEach(rule => {
    if (rule.regex.test(rawText)) {
      totalScore += rule.weight;
      detectedTriggers.push({
        category: 'Data Theft Vector',
        level: 'DANGER',
        label: rule.label,
        weight: rule.weight
      });
    }
  });

  // 4. Check Tech Support & Phone Scam
  TECH_SUPPORT_PATTERNS.forEach(rule => {
    if (rule.regex.test(rawText)) {
      totalScore += rule.weight;
      detectedTriggers.push({
        category: 'Tech Support Scam',
        level: 'DANGER',
        label: rule.label,
        weight: rule.weight
      });
    }
  });

  // 5. Check Package Smishing
  DELIVERY_PATTERNS.forEach(rule => {
    if (rule.regex.test(rawText)) {
      totalScore += rule.weight;
      detectedTriggers.push({
        category: 'Smishing Vector',
        level: 'WARNING',
        label: rule.label,
        weight: rule.weight
      });
    }
  });

  // 6. Extract URLs inside message and inspect them with UrlAnalyzer
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[^\s]*)/gi;
  const extractedUrlMatches = rawText.match(urlRegex) || [];
  const analyzedLinks = [];

  let highestLinkRisk = 0;
  extractedUrlMatches.forEach(urlStr => {
    try {
      const linkAnalysis = analyzeUrl(urlStr);
      analyzedLinks.push(linkAnalysis);
      if (linkAnalysis.riskScore > highestLinkRisk) {
        highestLinkRisk = linkAnalysis.riskScore;
      }
    } catch (e) {
      // Ignore invalid extracted URL substrings
    }
  });

  if (analyzedLinks.length > 0) {
    // Add link risk contribution
    const linkWeight = Math.min(highestLinkRisk * 0.5, 40);
    totalScore += linkWeight;
    detectedTriggers.push({
      category: 'Embedded URL Link',
      level: highestLinkRisk > 50 ? 'DANGER' : 'WARNING',
      label: `Embedded Link Analyzed (${analyzedLinks.length} found, Max Risk: ${highestLinkRisk}/100)`,
      weight: Math.round(linkWeight)
    });
  }

  // Cap final risk score
  const finalScore = Math.min(Math.max(Math.round(totalScore), 0), 100);

  // Category determination
  let primaryCategory = 'LEGITIMATE / LOW RISK';
  let threatColor = '#00e676';
  
  if (finalScore >= 65) {
    if (HARVESTING_PATTERNS.some(p => p.regex.test(rawText)) || analyzedLinks.some(l => l.riskScore >= 50)) {
      primaryCategory = 'HIGH RISK PHISHING / SMISHING SCAM';
    } else if (FINANCIAL_PATTERNS.some(p => p.regex.test(rawText))) {
      primaryCategory = 'FINANCIAL FRAUD / PRIZE SCAM';
    } else {
      primaryCategory = 'DANGEROUS SCAM MESSAGE';
    }
    threatColor = '#ff0844';
  } else if (finalScore >= 30) {
    primaryCategory = 'SUSPICIOUS MESSAGE / POTENTIAL SPAM';
    threatColor = '#ffb100';
  }

  // Plain English Explanation & Recommendations
  const plainLanguageSummary = generateMessagePlainLanguage(finalScore, detectedTriggers, analyzedLinks);
  const actionPlan = generateMessageActionPlan(finalScore);

  return {
    rawText,
    riskScore: finalScore,
    category: primaryCategory,
    threatColor,
    detectedTriggers,
    analyzedLinks,
    plainLanguageSummary,
    actionPlan
  };
}

/**
 * Generates simple language breakdown for non-technical users
 */
function generateMessagePlainLanguage(score, triggers, links) {
  if (score >= 65) {
    return `Warning! CyberShield has categorized this message as a MALICIOUS SCAM. The sender is using artificial sense of urgency or fear (e.g. account suspension, legal threats) along with deceptive links or prize claims to trick you into revealing personal credentials or transferring money.`;
  } else if (score >= 30) {
    return `Caution! This message displays characteristics of unwanted marketing, spam, or a suspicious request. Do not share any personal details or click external links without verifying the sender through an official phone number or website.`;
  }
  return `This message appears clean and low-risk based on standard natural language patterns. However, always exercise normal caution when communicating with unfamiliar contacts.`;
}

/**
 * Actionable Playbook for Message Threat
 */
function generateMessageActionPlan(score) {
  if (score >= 65) {
    return [
      { type: 'DONT', text: 'DO NOT click any embedded links or open attached files.' },
      { type: 'DONT', text: 'DO NOT reply to the message, and never share OTP/2FA verification codes.' },
      { type: 'DONT', text: 'DO NOT call any phone numbers provided in the body of the message.' },
      { type: 'DO', text: 'Block the sender contact immediately on your phone/email client.' },
      { type: 'DO', text: 'Report the message as spam/phishing to your service provider or internal IT security desk.' }
    ];
  } else if (score >= 30) {
    return [
      { type: 'CAUTION', text: 'Double check sender details (e.g. full email address behind display name).' },
      { type: 'DO', text: 'If it claims to be from a company you use, log into your account directly via a browser, not through this message.' }
    ];
  } else {
    return [
      { type: 'DO', text: 'No immediate threat detected. Keep your security software updated.' }
    ];
  }
}

/**
 * Sample Preset Messages for 1-click User Testing
 */
export const PRESET_SCAM_SAMPLES = [
  {
    title: 'Bank Suspension Smishing (SMS)',
    text: 'URGENT: Your Chase Bank account #8921 has been TEMPORARILY SUSPENDED due to unusual sign-in activity. Verify your identity immediately within 24 hours at http://chase-bank.security-verify.tk/login to restore full access.'
  },
  {
    title: 'USPS Package Delay Scam',
    text: 'USPS Notice: Your package delivery has been placed on hold due to incomplete house address number. Update your delivery address now: http://bit.ly/usps-deliv-update or item will be returned to sender.'
  },
  {
    title: 'Fake Geek Squad Invoice (Email)',
    text: 'INVOICE CONFIRMATION #GS-99482. Thank you for your auto-renewal purchase of Geek Squad Tech Support Plan for $499.99 billed to your card. If you did not authorize this charge, call support immediately at 1-800-555-0199 to claim a full refund.'
  },
  {
    title: 'Crypto Prize / Giveaway Scam',
    text: 'Congratulations! You have been selected as the 1st place winner of 0.55 Bitcoin ($35,000 USDT). Claim your free crypto reward now at http://free-btc-claim.xyz/bonus with secret code WIN2026.'
  },
  {
    title: 'Legitimate Security Alert (Safe)',
    text: 'Google Security Alert: A new sign-in was detected on your Chrome browser (Windows). If this was you, no action is needed. If not, check your account settings at https://myaccount.google.com/notifications.'
  }
];
