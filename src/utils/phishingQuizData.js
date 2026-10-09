/**
 * Phishing Simulator & Security Awareness Quiz Scenarios
 */

export const PHISHING_SCENARIOS = [
  {
    id: 1,
    title: 'Bank Urgency SMS Alert',
    type: 'SMS / Smishing',
    sender: '+1 (800) 555-0149',
    message: 'ALERT: Unusual card charge of $849.99 at Target. Reply YES if authorized or click http://bank-security-verify.tk/card to decline transaction immediately.',
    isPhishing: true,
    difficulty: 'Easy',
    redFlags: [
      'Uses high-risk free TLD (.tk)',
      'Asks to click link instead of official bank app',
      'Artificially creates panic with large fake financial charge'
    ],
    explanation: 'Legitimate banks will never ask you to click a non-official .tk website to reverse a credit card charge. Always call the official phone number on the back of your card.'
  },
  {
    id: 2,
    title: 'Internationalized Domain (Cyrillic Homograph)',
    type: 'Web Link',
    sender: 'security@аpple.com',
    message: 'Your iCloud storage renewal failed. Please log in at https://аpple.com/auth to update payment details.',
    isPhishing: true,
    difficulty: 'Hard',
    redFlags: [
      'The "а" in apple.com is a Cyrillic character (\u0430) rather than standard ASCII "a"',
      'Hovering over the link reveals Punycode xn--pple-43d.com',
      'Asks for urgent payment info'
    ],
    explanation: 'This is a classic Cyrillic Homograph attack! The letter "а" is from the Russian alphabet. Although it looks identical to English "a", it leads to a hacker-controlled web server.'
  },
  {
    id: 3,
    title: 'Official Google Account Security Alert',
    type: 'Email',
    sender: 'no-reply@accounts.google.com',
    message: 'New sign-in from Chrome on Windows (IP: 172.56.21.4). If this was you, you don\'t need to do anything. If not, check activity at https://myaccount.google.com/notifications.',
    isPhishing: false,
    difficulty: 'Medium',
    redFlags: [],
    explanation: 'This email is LEGITIMATE! Notice the sender domain is @accounts.google.com (official Google domain), and the link goes directly to google.com over HTTPS without urgency threats.'
  },
  {
    id: 4,
    title: 'Microsoft 365 OAuth App Permission Request',
    type: 'OAuth Consent',
    sender: 'External App: "PDF Converter Pro"',
    message: '"PDF Converter Pro" is requesting permission to: Read all your emails, Access files anytime, Send emails on your behalf.',
    isPhishing: true,
    difficulty: 'Hard',
    redFlags: [
      'An unverified third-party app requesting full Email Read/Write access',
      'App name ("PDF Converter") has no valid reason to read emails',
      'Exposes full account without needing your password'
    ],
    explanation: 'This is Consent Phishing! If granted, the rogue application gains full access to your cloud mailbox permanently without needing your password. Never grant mail access to unknown tools.'
  },
  {
    id: 5,
    title: 'USPS Package Address Update',
    type: 'SMS',
    sender: 'usps-tracking-notify@info-mail.org',
    message: 'USPS: Package delivery failed due to incorrect house number. Please update info within 12h: http://usps.package-redelivery-info.top/track',
    isPhishing: true,
    difficulty: 'Easy',
    redFlags: [
      'Domain is package-redelivery-info.top (not usps.com)',
      'Subdomain usps is placed in front to trick users',
      'Uses urgent 12-hour expiration pressure'
    ],
    explanation: 'USPS only uses usps.com for package tracking. Any SMS directing you to a .top or .info-mail website is a fraudulent smishing scam designed to steal your credit card.'
  }
];
