const request = require('supertest');
const app = require('../../../server');

describe('GET /quotes', () => {
  it('return status 200', (done) => {
    request(app)
      .get('/quotes')
      .expect(200, done);
  });
});
