const pool = require('./index');

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Migration done');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

module.exports = migrate;

