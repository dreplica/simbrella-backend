declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      ALLOWED_ORIGINS: string;
      MONGO_URI: string;
      // Add more variables as per your project
    }
  }