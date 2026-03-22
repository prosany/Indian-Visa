export const stageDomains: string[] = [
  'https://helpdesk-v2.jsdude.com',
  'https://helpdesk-v2.jsdude.com/v2',
  'https://helpdesk.mahabubsany.com',
  'http://localhost:4770',
];

export const productionDomains: string[] = [
  'https://helpdesk.programming-hero.com',
  'https://helpdesk.programming-hero.com/v2',
  'https://helpdesk-v2.programming-hero.com',
  'https://helpdesk.mahabubsany.com',
  'http://localhost:4770',
];

export const cookieEnabledDomains: Record<string, string> = {
  'api-helpdesk-v2.jsdude.com': '.jsdude.com',
  'helpdesk-v2.jsdude.com': '.jsdude.com',
  'helpdesk.mahabubsany.com': '.mahabubsany.com',
  'helpdesk.programming-hero.com': '.programming-hero.com',
  'helpdesk.phitron.io': '.phitron.io',
  localhost: 'localhost',
};

export type CookieEnabledDomains = keyof typeof cookieEnabledDomains;
