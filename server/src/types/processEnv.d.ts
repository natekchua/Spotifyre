declare namespace NodeJS {
  /**
   * Types based on .env file. When adding new keys to .env, make sure to add an entry here as well
   */
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;

    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_URL: string;

    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
  }
}
