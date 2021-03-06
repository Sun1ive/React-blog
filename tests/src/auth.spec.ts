import { agent, SuperTest } from 'supertest';
import { createApp } from '../../src';

describe('Auth test suit', async () => {
  let newUser: {
    email: string;
    password: string;
  };

  let app: SuperTest<any>;

  beforeAll(async () => {
    const server = await createApp();
    app = agent(server.listen(3001));
  });

  test('testing the server', async () => {
    const res = await app.get('/api');

    expect(res.status).toBe(200);
  });

  test('Should successfully create user', async () => {
    newUser = {
      email: `${Date.now()}@email.com`,
      password: 'qwerty12345'
    };

    const res = await app.post('/api/auth/signup').send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBe(undefined);
  });

  test('Should successfully login', async () => {
    const res = await app.post('/api/auth/signin').send(newUser);

    expect(res.status).toBe(200);
    expect(typeof res.body.data.accessToken).toBe('string');
    expect(typeof res.body.data.refreshToken).toBe('string');
  });

  // test('Should ..', async () => {});
  // test('Should ..', async () => {});
  // test('Should ..', async () => {});
});
