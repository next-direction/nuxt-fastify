const expect = require('expect')
const request = require('supertest')

const createServer = require('../../../server/create-server')

describe('Server', () => {
    it('Test construct', async () => {
        const app = await createServer();

        await app.ready();

        const response = await request(app.server)
            .get('/api/ping')
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe('pong');
            })
    });
})
