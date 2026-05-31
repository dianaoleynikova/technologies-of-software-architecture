const request = require('supertest');
const express = require('express');

jest.mock('../db/index', () => ({
  query: jest.fn()
}));

const pool = require('../db/index');

const app = express();
app.use(express.json());

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

describe('Health endpoints', () => {
  it('GET /health/alive повертає 200', async () => {
    const res = await request(app).get('/health/alive');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('GET /health/ready повертає 200 коли БД доступна', async () => {
    pool.query.mockResolvedValue({});
    const res = await request(app).get('/health/ready');
    expect(res.status).toBe(200);
  });

  it('GET /health/ready повертає 500 коли БД недоступна', async () => {
    pool.query.mockRejectedValue(new Error('DB error'));
    const res = await request(app).get('/health/ready');
    expect(res.status).toBe(500);
  });
});

