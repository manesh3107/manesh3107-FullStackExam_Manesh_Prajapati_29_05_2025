const request = require('supertest');
const app = require('../app');

describe('Auth', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe('test@example.com');
  });
});
