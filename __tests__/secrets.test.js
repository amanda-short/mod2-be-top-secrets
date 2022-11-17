const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secrets route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  const testSecret = {
    title: 'Lay low',
    description: 'They dont see us',
  };
  
  it('POST /api/v1/secrets creates a new secret', async () => {
    const res = await request(app).post('/api/v1/secrets').send(testSecret);
    expect(res.status).toBe(200);
    const { title, description } = testSecret;
  
    expect(res.body).toEqual({
      id: expect.any(String),
      title,
      description,
      createdAt: expect.any(String),
    });
  });

  it('GET /api/v1/secrets should return a list of secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toBe(200);
    const secret = res.body.find((secret) => secret.id === '1');
    expect(secret).toEqual({
      id: '1',
      title: 'Found Documents',
      description: 'Classified documents of the foreign minister found in damaged vehicle',
      createdAt: expect.any(String),
    });
  });  
});
  
afterAll(() => {
  pool.end();
});
