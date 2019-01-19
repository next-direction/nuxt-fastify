# Full stack project based on nuxt and vue 

This stack uses TypeScript!

## Current components of this stack

### Nuxt.js

* Axios as a module
* Lodash globally available through webpack plugin
* Vuex Store including module structure
* Persisted VUEX with cookies and localStorage as fallback

### VueJS

* LESS through loader
* ElementUI as UI framework (for tree shaking have a look at pages/index.vue)
* i18n Support

### FontAwesome 5.1

* Tree shaking (look at pages/index.vue for example)

### Fastify as server
* Requests to /api will be handled directly through fastify
* All other requests will be handled by nuxt

### MomentJS

### Testing
* Mocha as test runner
    * Server side testing with supertest and expect
    * Client side testing with expect
        * Because testing components depends on the concrete scenario, check [vue docs](https://vuejs.org/v2/guide/unit-testing.html#Setup-and-Tooling) for details.
* Integration in GitLab through basic runner setup
* Test coverage through GitLab with Istanbul / NYC

## Usage of the included components
See [this page](USAGE.md) for information on how to use components of the stack

## Usage of this branch

Same as for all project including node server. After cloning the repository, go to the directory and execute:

```bash 
npm install

npm run dev
```

If you'd like to test productive builds, you can simply execute the following commands:

```bash
npm run build

npm start
```

If you like to test the stack, you have three commands available:

```bash
# test client
npm run test-client

# test server
npm run test-server

# test both
npm run test
```

Of course you can always have a look in the `package.json` file for available script commands.
