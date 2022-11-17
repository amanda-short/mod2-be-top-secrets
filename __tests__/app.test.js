const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('users route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: '321321',
  };

  it('POST /api/v1/users creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    expect(res.status).toBe(200);
    const { firstName, lastName, email } = testUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('POST /api/v1/users/sessions signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '321321' });
    expect(res.status).toEqual(200);
  });

  it('GET api/v1/users/protected should return a 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/users/protected');
    expect(res.status).toEqual(401);
  });

  it('api/v1/users/protected should return the current user if authenticated', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...testUser });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '321321' });
    const res = await agent.get('/api/v1/users/protected');
    expect(res.status).toEqual(200);
  });

  it('DELETE /sessions deletes the user session', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...testUser });
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '321321' });

    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
});

  // it('GET api/v1/users should return 401 if user not admin', async () => {
  //   const agent = request.agent(app);
  //   const user = await UserService.create({ ...testUser });

  //   await agent
  //     .post('/api/v1/users/sessions')
  //     .send({ email: 'test@example.com', password: '12345' });

  //   const res = await agent.get('/api/v1/users/');
  //   expect(res.status).toEqual(403);
  // });

  // it('/users should return 200 if user is admin', async () => {
  //   const agent = request.agent(app);

  //   await agent.post('/api/v1/users').send({
  //     email: 'admin',
  //     password: '1234',
  //     firstName: 'admin',
  //     lastName: 'admin',
  //   });

  //   await agent
  //     .post('/api/v1/users/sessions')
  //     .send({ email: 'admin', password: '1234' });

  //   const res = await agent.get('/api/v1/users/');
  //   console.log(res.body);
  //   expect(res.status).toEqual(200);
  // });

  // describe('secrets route', () => {
  //   beforeEach(() => {
  //     return setup(pool);
  //   });

  //   it.skip('GET /api/v1/secrets should return a list of secrets', async () => {
  //     const resp = await request(app).get('/secrets');
  //     expect(resp.body.length).toEqual(3);
  //     const foundDocuments = resp.body.find((secret) => secret.id === '1');
  //     expect(foundDocuments).toHaveProperty('title', 'Found Documents');
  //     expect(foundDocuments).toHaveProperty('description', 'Classified documents of the foreign minister found in damaged vehicle');
  //     expect(foundDocuments).toHaveProperty('timestamp', '2022');
  //   });
  // });

afterAll(() => {
  pool.end();
});
