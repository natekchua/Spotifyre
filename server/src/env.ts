import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';

if (process.env.NODE_ENV === 'development') {
  // Merge the .env.local and .env
  ['.env.local', '.env'].forEach(env => {
    const path = resolve(process.cwd(), env);
    if (existsSync(path)) {
      dotenv.config({ path });
    }
  });
} else {
  dotenv.config();
}

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.error(new Error(`Failed to start the server: Please specify 'process.env.SPOTIFY_CLIENT_ID' and 'process.env.SPOTIFY_CLIENT_SECRET'`));
}