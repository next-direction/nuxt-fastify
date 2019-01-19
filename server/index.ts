process.env.NODE_CONFIG_DIR = __dirname + "/config/";

const config = require("config");
const chalk = require("chalk");

async function listen() {
    const createServer = require("./create-server");
    const app = await createServer();
    const host = config.get("server.host");
    const port = config.get("server.port");

    await app.ready();

    app.listen(port, host, (err, addr) => {

        if (err) {
            throw err;
        }

        if (config.util.getEnv("NODE_ENV") !== "production") {
            // tslint:disable-next-line:no-console
            console.log(chalk.blue(`Server listening to ${addr}`));
        }
    });
}

listen();

export { };
