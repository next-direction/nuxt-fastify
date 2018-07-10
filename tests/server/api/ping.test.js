const expect = require('expect')
const request = require('supertest')

const { app } = require('../../../server/index')

describe('Server', () => {
    it('Test construct', (done) => {
        request(app)
        .get('/api/ping')
        .expect(200)
        .expect((res) => {
            expect(res.text).toBe('pong');
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        })
    });
})
