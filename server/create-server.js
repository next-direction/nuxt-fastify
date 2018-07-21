const Fastify = require('fastify')
const {
    Nuxt, Builder
} = require('nuxt')

async function buildServer() {
    const app = Fastify()
    const isDev = (process.env.NODE_ENV === 'development')

    // We instantiate nuxt.js with the options
    const config = require('./../nuxt.config.js')
    const nuxt = new Nuxt(config)

    if (isDev) {
        await new Builder(nuxt).build()
    }

    app.get('/api/ping', (request, reply) => {
        reply.send('pong')
    })

    app.use((req, res, next) => {
        console.log(req.url);
        if (req.url.startsWith('/api')) {
            next();
        } else {
            return nuxt.render(req, res);
        }
    });

    return app
}

module.exports = buildServer
