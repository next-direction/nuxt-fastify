# Full stack project based on nuxt and vue 
[![pipeline status](http://gitlab.projects-by-me.de/playground/nuxt-full-fastify/badges/master/pipeline.svg)](http://gitlab.projects-by-me.de/playground/nuxt-full-fastify/commits/master)
 [![coverage report](http://gitlab.projects-by-me.de/playground/nuxt-full-fastify/badges/master/coverage.svg)](http://gitlab.projects-by-me.de/playground/nuxt-full-fastify/commits/master)

## Current components of this stack

### Nuxt.js

* Axios as a module
* Lodash globally available through webpack plugin
* Vuex Store including module structure

### VueJS

* LESS through loader
* ElementUI as UI framework (for tree shaking have a look at pages/index.vue)
* i18n Support

### FontAwesome 5.1

* Tree shaking (look at pages/index.vue for example)

### Express as server

### MomentJS

### Testing
* Mocha as test runner
    * Server side testing with supertest and expect
    * Client side testing with expect
        * Because testing components depends on the concrete scenario, check [vue docs](https://vuejs.org/v2/guide/unit-testing.html#Setup-and-Tooling) for details.
* Integration in GitLab through basic runner setup
