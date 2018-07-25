const Fastify = require('fastify')
const {
    Nuxt, Builder
} = require('nuxt-edge')

async function buildServer() {
    const app = Fastify()
    const isDev = (process.env.NODE_ENV === 'development')

    // We instantiate nuxt.js with the options
    const config = require('./../nuxt.config.js')
    const nuxt = new Nuxt(config)

    if (isDev) {
        await new Builder(nuxt).build()
    }

   // define routes for api here (maybe in extra files)

    app.use((req, res, next) => {

        // let fastify handle api requests
        if (req.url.startsWith('/api')) {
            next();
        } else {

            // nuxt handles all other requests
            return nuxt.render(req, res);
        }
    });

    return app
}

module.exports = buildServer
