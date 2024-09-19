declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      API_ENDPOINT: string;
      PORT?: string;
      ALLOWED_ORIGINS: string;
      MONGO_URI: string;
      SECRET: string;
      MAIL_ADDRESS: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_AUTH_USER: string;
      MAIL_AUTH_PASS: string;
      // Add more variables as per your project
    }
  }