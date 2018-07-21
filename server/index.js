const {
    Nuxt,
    Builder
} = require('nuxt')

listen()

async function listen() {
    const createServer = require('./create-server')
    const app = await createServer();
    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || 3000

    app.listen(port, host, () => {
        console.log('Server listening on `localhost:' + port + '`.')
    })
}
