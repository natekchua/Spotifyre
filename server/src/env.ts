import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'development' ? '.local' : ''}`
  )
});
