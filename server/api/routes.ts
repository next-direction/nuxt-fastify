module.exports = async (fastify, opts) => {
    fastify
        .get("/ping", {
            schema: {
                description: "Check API availability",
                response: {
                    200: {
                        content: "plain/text",
                        example: "pong",
                        type: "string",
                    },
                },
                summary: "Check API availability",
                tags: ["Basic"],
            },
        }, (request, reply) => {
            reply.send("pong");
        });
        // Example of how to register sub routes in separate files
        // .register(require("./user/index"), { prefix: "/users" })
};
