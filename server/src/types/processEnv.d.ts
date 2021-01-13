declare namespace NodeJS {
  /**
   * Types based on .env file. When adding new keys to .env, make sure to add an entry here as well
   */
  export interface ProcessEnv {
    NODE_ENV: Environment;
    PORT: string;

    POSTGRES_USER: string;
    POSTGRES_NAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_URL: string;

    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;

    USE_DOCKER: string;
  }
}
