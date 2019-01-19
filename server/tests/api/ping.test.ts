const expect = require("expect");
const createServer = require("../../create-server");
const request = require("supertest");

describe("/ping", async () => {
    let app;

    before(async () => {
        app = await createServer();
        await app.ready();
    });

    it("GET /", async () => {
        await request(app.server)
            .get("/api/ping")
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe("pong");
            });
    });

    it("GET /pong (test 404)", async () => {
        await request(app.server)
            .get("/api/ping/pong")
            .expect(404);
    });

    after(async () => {
        app.close();
    });
});

export {};
