import { agent } from 'supertest';
import { createApp } from '../../src';

describe('Auth test suit', () => {
  let app: any;

  beforeAll(async () => {
    const server = await createApp();
    app = agent(server.listen(3001));
  });

  test('testing the server', async () => {
    const res = await app.get('/api');

    expect(res.status).toBe(200);
  });
});
