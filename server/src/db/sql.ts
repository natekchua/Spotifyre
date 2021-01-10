// Connect with PostgresSQL
import pg, { Defaults, PoolConfig } from 'pg';

// Database config
const config: PoolConfig & Defaults = {
  user: process.env.DB_user,
  database: process.env.DB,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: 5432,
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000
};

if (process.env.NODE_ENV === 'development') {
  config.ssl = {
    rejectUnauthorized: false
  };
}

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
