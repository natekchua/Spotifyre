// Connect with PostgresSQL
const pg = require('pg');

// Database config
const config = {
  user: process.env.DB_user,
  database: process.env.DB,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: 5432,

  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000,
};

const pool = new pg.Pool(config);
