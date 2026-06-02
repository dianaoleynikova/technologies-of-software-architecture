const request = require('supertest');
const express = require('express');
jest.mock('../db/index', () => ({ query: jest.fn() }));
const pool = require('../db/index');
const tasksRouter = require('../routes/tasks');
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);
describe('Failing test', () => {
  it('цей тест навмисно падає', () => {
    expect(1).toBe(2);
  });
});

