declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    JWT_SECRET: string;
    ENCRYPTION_KEY: string;
  }
}
