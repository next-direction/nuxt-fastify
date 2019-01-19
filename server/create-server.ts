const Fastify = require("fastify");
const {
    Nuxt, Builder,
} = require("nuxt");

async function buildServer() {
    const config = require("config");
    const isProd = (config.util.getEnv("NODE_ENV") === "production");

    let app;

    // we don't need logging during tests
    if (config.util.getEnv("NODE_ENV") !== "test") {
        let stream = null;

        if (isProd) {
            const fs = require("fs");
            stream = fs.createWriteStream("./server/log/server.log");
        }

        const log = require("pino")({ level: config.get("server.logLevel"), prettyPrint: !isProd }, stream);

        app = Fastify({ logger: log });
    } else {
        app = Fastify();
    }

    const isDev = (config.util.getEnv("NODE_ENV") === "development");

    // We instantiate nuxt.js with the options
    const nuxtConfig = require("./../nuxt.config");
    const nuxt = new Nuxt(nuxtConfig);

    if (isDev) {

        try {
            await new Builder(nuxt).build();
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    // define routes for api here (maybe in extra files)
    app.register(require("./api/routes"), { prefix: "/api" });

    app.use((req, res, next) => {
        // let fastify handle api requests
        if (req.url.startsWith("/api") || req.url.startsWith("/docs")) {
            next();
        } else {

            // nuxt handles all other requests
            return nuxt.render(req, res);
        }
    });

    app.register(require("fastify-sensible"));

    return app;
}

module.exports = buildServer;
