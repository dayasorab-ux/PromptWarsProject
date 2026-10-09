/**
 * CyberShield Intelligent AI Security Assistant Engine
 * Translates complex technical cybersecurity concepts into simple, actionable explanations.
 */

export const PRESET_AI_QUESTIONS = [
  {
    id: 'homograph',
    title: 'What is a Cyrillic Homograph attack?',
    category: 'Domain Security',
    question: 'How do scammers use lookalike letters in website links?',
    answerSimple: 'Think of homograph attacks like someone using a twin letter from a foreign alphabet. For example, the Cyrillic letter "а" looks identical to the English letter "a". A scammer registers a domain using the Cyrillic "а" (e.g. аpple.com). To your eyes, it looks exactly like "apple.com", but your browser routes you to a completely different malicious server created to steal your passwords.',
    technicalDetails: 'Internationalized Domain Names (IDNs) allow non-ASCII characters via Punycode encoding (xn--...). Attackers register Punycode domains matching target brand names. Mitigations include browser Punycode display enforcement, IDN homograph defense algorithms, and HTTPS certificate subject name checks.'
  },
  {
    id: 'consent_phishing',
    title: 'What is OAuth Consent Phishing?',
    category: 'Identity Theft',
    question: 'How can hackers access my account without stealing my password?',
    answerSimple: 'Instead of asking for your password, scammers create a fake app (like "PDF Reader Tool") and ask you to click "Sign in with Google" or "Sign in with Microsoft". When you approve access, you grant the app permission to read your emails, files, and contacts forever—even if you change your password later! Never approve unknown app consent requests.',
    technicalDetails: 'OAuth 2.0 / OpenID Connect authorization code flow exploitation. Rogue applications request scopes such as Mail.Read, Files.ReadWrite, or Offline_Access. Attackers receive access and refresh tokens directly without possessing user credentials. Remediation involves revoking app consent grants in Azure AD / Google Workspace admin portals.'
  },
  {
    id: 'dmarc_spf',
    title: 'What do DMARC, SPF, and DKIM mean?',
    category: 'Email Security',
    question: 'How do email servers know if an email is fake or forged?',
    answerSimple: 'Imagine sending a physical letter. Anyone can write "CEO of Bank" as the return address on the envelope. SPF acts like a guest list checking if the letter came from an authorized post office. DKIM is like a wax seal ensuring nobody opened or changed the letter in transit. DMARC tells the mailbox what to do if the letter fails those tests (e.g. throw it straight into Spam or destroy it).',
    technicalDetails: 'Sender Policy Framework (SPF) publishes IP address records in DNS. DomainKeys Identified Mail (DKIM) adds cryptographic RSA signatures to mail headers. Domain-based Message Authentication, Reporting, and Conformance (DMARC) aligns SPF/DKIM domains and enforces policy actions (p=none, p=quarantine, p=reject).'
  },
  {
    id: 'mfa_fatigue',
    title: 'What is MFA Push Fatigue / Prompt Bombing?',
    category: 'Authentication',
    question: 'Why do hackers send dozens of login notification alerts to my phone?',
    answerSimple: 'When a hacker steals your password, they trigger 50 security approval popups on your phone at 3 AM. They hope you get annoyed or confused and tap "Approve" just to stop the notifications. If you receive unexpected MFA popups, tap "DECRY / DENY" and change your password immediately!',
    technicalDetails: 'MFA Push Bombing relies on user exhaustion to bypass 2-Factor Authentication. Countermeasures include FIDO2 WebAuthn hardware keys, number-matching prompts (displaying a 2-digit number on screen to type into the authenticator app), and risk-based adaptive authentication.'
  },
  {
    id: 'clicked_link',
    title: 'What should I do if I clicked a suspicious link?',
    category: 'Incident Response',
    question: 'Step-by-step instructions if I opened a dangerous email link.',
    answerSimple: 'Don\'t panic! Follow these 4 quick steps:\n1. Close the web browser immediately.\n2. Do NOT enter any username, password, or credit card.\n3. If you typed a password, go to the official website from a different browser and change your password immediately.\n4. Enable 2-Factor Authentication and run an antivirus system scan.',
    technicalDetails: '1. Isolate browser context & terminate session cookies.\n2. Audit recently downloaded files or executable payloads in Downloads folder.\n3. Revoke active session tokens for affected identity providers.\n4. Perform full endpoint EDR / Antivirus scan for drive-by malware or session hijacking artifacts.'
  }
];

/**
 * Responds to custom user security questions
 */
export function generateAiAssistantResponse(userQuery) {
  if (!userQuery || userQuery.trim().length === 0) {
    return {
      simple: 'Please type a cybersecurity question or threat term (e.g. "What is typosquatting?", "How to spot fake SMS?").',
      technical: ''
    };
  }

  const queryLower = userQuery.toLowerCase();

  // Check matching presets
  for (const preset of PRESET_AI_QUESTIONS) {
    if (queryLower.includes(preset.id) || queryLower.includes(preset.title.toLowerCase()) || preset.question.toLowerCase().includes(queryLower)) {
      return {
        simple: preset.answerSimple,
        technical: preset.technicalDetails
      };
    }
  }

  // Dynamic Rule-Based Cyber Knowledge Response Generator
  if (queryLower.includes('password') || queryLower.includes('passcode')) {
    return {
      simple: 'Strong passwords should be at least 14-16 characters long and use a mix of letters, numbers, and symbols. The safest approach is using a Password Manager (like Bitwarden or 1Password) so every site has a unique password.',
      technical: 'Enforce minimum entropy >= 64 bits. Mitigate credential stuffing attacks by checking passwords against HaveIBeenPwned API (k-Anonymity model) and enforcing salted Argon2id / bcrypt hash storage.'
    };
  } else if (queryLower.includes('wifi') || queryLower.includes('public wifi') || queryLower.includes('hotspot')) {
    return {
      simple: 'Public Wi-Fi networks (like coffee shop Wi-Fi) can be intercepted by hackers nearby. Always use a Virtual Private Network (VPN) on public Wi-Fi, and never enter sensitive banking information unless the site uses HTTPS.',
      technical: 'Mitigate Man-in-the-Middle (MitM) ARP spoofing, Evil Twin APs, and SSL Stripping by utilizing encrypted WireGuard / IPsec VPN tunnels, enforcing HSTS preload lists, and disabling auto-connect for open SSIDs.'
    };
  } else if (queryLower.includes('malware') || queryLower.includes('virus') || queryLower.includes('ransomware')) {
    return {
      simple: 'Malware is malicious software secretly installed on your device. Ransomware encrypts your personal photos and documents and demands money to unlock them. Always keep your system updated and backup files to an external drive.',
      technical: 'Defense-in-depth requires signature and heuristic EDR monitoring, least-privilege execution (User Account Control), air-gapped 3-2-1 backup policies, and disabling macro execution in office document parsers.'
    };
  } else if (queryLower.includes('phishing') || queryLower.includes('scam') || queryLower.includes('fake')) {
    return {
      simple: 'Phishing is when scammers pretend to be trusted organizations (like your bank or Amazon) to trick you into revealing passwords or payment info. Always check the sender\'s full email address and look out for urgent threats or typos.',
      technical: 'Phishing vectors leverage psychological influence (Scarcity, Authority, Urgency). Technical controls include email authentication alignment (SPF/DKIM/DMARC), DNS sinkholing, and automated URL heuristic analysis.'
    };
  }

  // Default Cyber Assistant response
  return {
    simple: `Security Advice for "${userQuery}":\nWhen assessing digital threats related to this topic, always evaluate three key principles:\n1. Verification: Never trust unexpected messages or links without out-of-band confirmation.\n2. Least Privilege: Only provide the bare minimum personal data required.\n3. Defense-in-Depth: Enable 2FA, keep software updated, and use automated threat analyzers like CyberShield.`,
    technical: `Threat Vectors & Security Architecture:\nEnsure endpoint monitoring, TLS 1.3 encryption, strict identity verification (Zero Trust model), and continuous log auditing to defend against credential harvesting and malicious payload delivery.`
  };
}
