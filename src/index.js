const express = require('express');
const pool = require('./db/index');
const migrate = require('./db/migrate');
const tasksRouter = require('./routes/tasks');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html><body>
    <h1>Task Tracker API</h1>
    <ul>
      <li>GET /tasks</li>
      <li>POST /tasks</li>
      <li>POST /tasks/:id/done</li>
    </ul>
    </body></html>
  `);
});

app.get('/health/alive', (req, res) => {
  res.status(200).send('OK');
});

app.get('/health/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send('DB not available');
  }
});

app.use('/tasks', tasksRouter);

migrate().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});

