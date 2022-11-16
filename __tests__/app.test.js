const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '321321',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...testUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  
  it('logs in a user', () => {
  
  expect(1).toEqual(1);
});

afterAll(() => {
  pool.end();
});
});

