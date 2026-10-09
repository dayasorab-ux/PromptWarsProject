/**
 * Attack Surface & Supply Chain Defense Engine
 * Powers Dynamic Attack Surface Mapping (EASM), Adversary Infrastructure Tracking, Brand Protection & Takedowns, and Third-Party Risk Scoring.
 */

// 1. Dynamic Attack Surface Mapping (EASM) Inventory
export const EASM_ASSETS = [
  {
    id: 'ASM-01',
    assetName: 'api.cybershield.io',
    type: 'Subdomain / REST API Gateway',
    ipAddress: '104.21.88.190',
    openPorts: [80, 443, 8080],
    cloudProvider: 'AWS US-East-1',
    sslCertValid: true,
    riskScore: 'LOW',
    status: 'Monitored & Shielded'
  },
  {
    id: 'ASM-02',
    assetName: 'dev-staging.cybershield.io',
    type: 'Exposed Staging Environment',
    ipAddress: '54.210.12.91',
    openPorts: [80, 443, 22, 9200], // Elasticsearch port 9200 exposed!
    cloudProvider: 'AWS EC2',
    sslCertValid: false, // Expired Cert
    riskScore: 'CRITICAL',
    status: 'Unprotected Elastic Search Port Exposer'
  },
  {
    id: 'ASM-03',
    assetName: 'cybershield-backups-internal.s3.amazonaws.com',
    type: 'Cloud Storage Bucket',
    ipAddress: 'S3 Managed Endpoint',
    openPorts: [443],
    cloudProvider: 'AWS S3',
    sslCertValid: true,
    riskScore: 'HIGH',
    status: 'Public Readable Bucket ACL Detected'
  },
  {
    id: 'ASM-04',
    assetName: 'mail.cybershield.io',
    type: 'Exchange / SMTP Gateway',
    ipAddress: '198.51.100.42',
    openPorts: [25, 465, 587, 993],
    cloudProvider: 'On-Premises Hybrid Cloud',
    sslCertValid: true,
    riskScore: 'LOW',
    status: 'SPF / DKIM / DMARC Enforced'
  }
];

// 2. Adversary Infrastructure Tracking Data
export const ADVERSARY_INFRASTRUCTURE = [
  {
    id: 'ADV-901',
    domain: 'cybershield-login-auth.com',
    registeredDate: '2026-10-08 (24h ago)',
    registrar: 'NameCheap Inc.',
    ipCluster: '185.220.101.5 (Bulletproof Host Russia)',
    sslIssuer: "Let's Encrypt (Issued yesterday)",
    threatActor: 'APT29 / Cozy Bear Affiliate',
    status: 'Active Phishing C2 Infrastructure'
  },
  {
    id: 'ADV-904',
    domain: 'cybershield-verify-sso.net',
    registeredDate: '2026-10-07',
    registrar: 'Porkbun LLC',
    ipCluster: '194.26.29.112 (Frankfurt Proxy Node)',
    sslIssuer: 'ZeroSSL',
    threatActor: 'Storm-0558 Phishing Kit',
    status: 'Staging OAuth Credential Harvester'
  },
  {
    id: 'ADV-909',
    domain: 'cybershieId.io', // Homograph L -> I
    registeredDate: '2026-10-05',
    registrar: 'Dynadot Inc',
    ipCluster: '45.142.214.88 (Offshore Hosting)',
    sslIssuer: 'Cloudflare Inc',
    threatActor: 'Fin7 Financial Crime Syndicate',
    status: 'Suspicious typosquatting domain'
  }
];

// 3. Brand Protection and Takedown Requests
export const BRAND_PROTECTION_ITEMS = [
  {
    id: 'TKD-401',
    type: 'Typosquatting Domain',
    asset: 'http://cybershieId-portal.com',
    threatDetails: 'Cloned login portal with active password sniffer.',
    detectionDate: '2026-10-08',
    status: 'Takedown Initiated',
    takedownProgress: 75
  },
  {
    id: 'TKD-405',
    type: 'Spoofed Mobile App Store Clone',
    asset: 'CyberShield SecPass (APKMirror)',
    threatDetails: 'Trojanized APK embedding Anatsa Banking Malware payload.',
    detectionDate: '2026-10-07',
    status: 'Abuse Notice Sent to Registrar',
    takedownProgress: 50
  },
  {
    id: 'TKD-409',
    type: 'Fake Social Media Profile',
    asset: '@CyberShield_Official_Support (X / Twitter)',
    threatDetails: 'Impersonating customer service to trick users into revealing seed phrases.',
    detectionDate: '2026-10-09',
    status: 'Pending Verification',
    takedownProgress: 10
  }
];

// 4. Supply Chain & Third-Party Risk Scoring
export const THIRD_PARTY_VENDORS = [
  {
    id: 'VND-01',
    vendorName: 'Cloudflare Inc.',
    category: 'CDN & DNS Infrastructure',
    securityScore: 98,
    riskGrade: 'A+',
    vulnerabilitiesCount: 0,
    mfaEnforced: true,
    lastAuditDate: '2026-09-15',
    status: 'Trusted Partner'
  },
  {
    id: 'VND-02',
    vendorName: 'PartnerDev Solutions LLC',
    category: 'Outsourced Engineering',
    securityScore: 64,
    riskGrade: 'D',
    vulnerabilitiesCount: 7,
    mfaEnforced: false, // Danger!
    lastAuditDate: '2026-05-10',
    status: 'High Island-Hopping Risk'
  },
  {
    id: 'VND-03',
    vendorName: 'Salesforce CRM',
    category: 'SaaS Customer Platform',
    securityScore: 92,
    riskGrade: 'A',
    vulnerabilitiesCount: 1,
    mfaEnforced: true,
    lastAuditDate: '2026-08-20',
    status: 'Low Risk'
  },
  {
    id: 'VND-04',
    vendorName: 'FastLogistics API Gateway',
    category: 'Supply Chain Shipping API',
    securityScore: 78,
    riskGrade: 'C+',
    vulnerabilitiesCount: 4,
    mfaEnforced: true,
    lastAuditDate: '2026-07-01',
    status: 'Moderate Risk'
  }
];
