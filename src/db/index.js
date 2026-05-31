const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'mywebapp',
  password: process.env.DB_PASSWORD || 'mywebapp123',
  database: process.env.DB_NAME || 'mywebapp'
});

module.exports = pool;

