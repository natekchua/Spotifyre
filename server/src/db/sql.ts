// Connect with PostgresSQL
import pg, { Defaults, PoolConfig } from 'pg';

// Database config
const config: PoolConfig & Defaults = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT, 10) ?? 5432,
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000,
  ssl: process.env.NODE_ENV === 'production'
};

const pool = new pg.Pool(config);

pool.connect((isErr, client, done) => {
  if (isErr) {
    console.log(`Connect query error: ${isErr.message}`);
    return;
  }

  client.query('select now();', [], (err, queryResult) => {
    if (err) {
      console.log('postgresql: connection failed ->', err);
    } else {
      // Query result
      console.log(
        `postgresql: connection established (${queryResult.rows[0].now})`
      );
    }

    done();
  });
});

export const SQL = async (query: string) => {
  return await pool.query(query);
};

pool.on('error', (err) => console.log('postgresql: error ->', err));
