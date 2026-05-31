const express = require('express');
const router = express.Router();
const pool = require('../db/index');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
  if (req.headers['accept'] === 'application/json') {
    return res.json(result.rows);
  }
  let rows = result.rows.map(t => `<tr><td>${t.id}</td><td>${t.title}</td><td>${t.status}</td><td>${t.created_at}</td></tr>`).join('');
  res.send(`<table border="1"><tr><th>ID</th><th>Title</th><th>Status</th><th>Created</th></tr>${rows}</table>`);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
  if (req.headers['accept'] === 'application/json') {
    return res.status(201).json(result.rows[0]);
  }
  res.status(201).send(`<p>Created: ${result.rows[0].title}</p>`);
});

router.post('/:id/done', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *', ['done', id]);
  if (req.headers['accept'] === 'application/json') {
    return res.json(result.rows[0]);
  }
  res.send(`<p>Task ${id} marked as done</p>`);
});

module.exports = router;

