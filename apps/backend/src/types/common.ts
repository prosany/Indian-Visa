export type HttpStatus = {
  OK: number;
  CREATED: number;
  ACCEPTED: number;
  NO_CONTENT: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  VALIDATION_ERROR: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  CONFLICT: number;
  INTERNAL_SERVER_ERROR: number;
  TEMPORARY_REDIRECT: number;
  PERMANENT_REDIRECT: number;
};

export type Config = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  DATABASE_URL: string | undefined;
};

export type CorsConfig = {
  origin: string[] | boolean;
  methods: string[];
  allowedHeaders: string[];
  credentials: boolean;
};

export type CookieEnabledDomains = {
  [key: string]: string;
};
