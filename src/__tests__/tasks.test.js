const request = require('supertest');
const express = require('express');

// Mock pg pool
jest.mock('../db/index', () => ({
  query: jest.fn()
}));

const pool = require('../db/index');
const tasksRouter = require('../routes/tasks');

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('GET /tasks', () => {
  it('повертає HTML таблицю', async () => {
    pool.query.mockResolvedValue({ rows: [
      { id: 1, title: 'Test', status: 'pending', created_at: new Date() }
    ]});
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<table');
  });

  it('повертає JSON якщо Accept: application/json', async () => {
    pool.query.mockResolvedValue({ rows: [
      { id: 1, title: 'Test', status: 'pending', created_at: new Date() }
    ]});
    const res = await request(app)
      .get('/tasks')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /tasks', () => {
  it('створює нову задачу', async () => {
    pool.query.mockResolvedValue({ rows: [
      { id: 1, title: 'New task', status: 'pending', created_at: new Date() }
    ]});
    const res = await request(app)
      .post('/tasks')
      .set('Accept', 'application/json')
      .send({ title: 'New task' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New task');
  });
});

describe('POST /tasks/:id/done', () => {
  it('позначає задачу як виконану', async () => {
    pool.query.mockResolvedValue({ rows: [
      { id: 1, title: 'Test', status: 'done', created_at: new Date() }
    ]});
    const res = await request(app)
      .post('/tasks/1/done')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });
});

