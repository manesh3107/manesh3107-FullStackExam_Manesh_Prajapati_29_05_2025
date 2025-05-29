const { Pool } = require('pg');
require('dotenv').config();


// Dev
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
//   idleTimeoutMillis: 5000,
//   connectionTimeoutMillis: 3000,
// });

// Production


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Render
  }
});

module.exports = pool;


