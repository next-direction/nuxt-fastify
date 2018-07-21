# Stack Usage Examples
This page should give you an overview of how to use the components of this stack. You can also have a look at the master branch of the original nuxt-full-fastify project because it still contains most of the examples.

## Nuxt
===

### Axios Module
---
It's really simple to use axios in all project files because it is registered as a Nuxt module:

```php
this.$axios.$get('/lang/en.json').then((res) => {
    // do something with the response
}).catch((e) => {
    // do something with the error
});
```

Because Axios returns a promise, it is really easy to use it in `asyncData` and `fetch` methods of Nuxt. Just return the call to Axios Module. The same is true for `nuxtServerInit` action in the root store.

For all available options for Axios, have a look at the [official project page](https://github.com/axios/axios) or the [Nuxt module docs](https://axios.nuxtjs.org/)

### Lodash Library
---

This again is very easy to use because it is globally available as the `_` variable:

```javascript
const chunks = _.chunk(['a', 'b', 'c', 'd'], 2);
// chunks => [['a', 'b'], ['c', 'd']]
```

That's all, for everything else regarding Lodash, check the [official docs](https://lodash.com/docs/4.17.10)

### Vuex Store
---

#### Modules

Nuxt supports Vuex modules. For this you only have to create a file named like the module name you like to have. After that it is simply [vuex namespacing](https://vuex.vuejs.org/guide/modules.html#namespacing) for the modules. The root store is defined in `store/index.js`. You can also have a look at the [Nuxt docs](https://nuxtjs.org/guide/vuex-store#modules-mode) about modules. Here is an example of a simple module named `list` and therefore located in `store/list.js`:

```javascript
export const state = () => ({

})

export const getters = {

}

export const actions = {

}

export const mutations = {

}
```

As you can see, nothing special here. **Note:** `state` should always be a function to avoid race conditions.

#### Persisted state
If you need some of the stored values persisted to client/server, you can use the vuex-persisted plugin located in `plugins/vuex-persistent.js`. There you find an array `paths` where all values that should be persiste can be added. This also supports module namespaces:

```javascript
paths: [
    'locale.current', // root state with embedded object value
    'list/count'      // module "list" state
]
```

#### nuxtServerInit and Vuex modules
This took me some time to figure out how this would actually work so I decided to share this gained knowledge with you. Here is an example of the `nuxtServerInit` method you can use to initialize the main store and all modules if needed:

```javascript
// to simulate async action in the root store
const p = new Promise((resolve, reject) => {
    resolve();
});

// use this for chaining init functions of store modules
return Promise.all([
    p,
    dispatch('list/nuxtServerInit', 20)
])
```

In this example there is a promise `p` for root store and an action dispatch (which must return a promise) to the module of the store. After both promises are resolved, the `nuxtServerInit` method returns and Nuxt renders the page. Of course you can use the return value of an Axios call here as well which is probably the normal use case.

For this to work you of course need the related action in the module file:

```javascript
export const actions = {
    nuxtServerInit(context, test) {
        return new Promise((resolve, reject) => {
            context.commit('test', test);
            resolve();
        });
    }
}
```

## VueJS
===

Of course base technology of this stack is still VueJS. So a good start would be to look at the [complete documentation](https://vuejs.org/v2/guide/) of this project if you have any questions.

### LESS
---

For more details about LESS in general, have a look at this [comprehensive overview](http://lesscss.org/features/) of all available features.

There are just two things I like to clarify about usage inside this stack:
* All LESS files must be placed inside `assets/styles/` folder
* To use it inside a VueJS component (`*.vue` file), the following code is required:
    ```css
    <style lang="less" scoped>
        @import "~assets/styles/variables";

        .colored {
            color: @link-color;
        }
    </style>
    ```

### ElementUI
---
You should always use a ElementUI component when possible. To load the elements you need, use the plugin file `plugins/element-ui.js`. This is important to enable tree shaking which only includes the components you really use in the final bundle. To see how the components look like and what's available, check the [official guide](http://element.eleme.io/#/en-US/component/installation)

Here is the js code for the plugin to be able to use a button and a select box:

```javascript
import Vue from 'vue';
import {
    Button, Select
} from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
```

You can add any element you need here. To see available element names, check the `Full example` section in the [docs](http://element.eleme.io/#/en-US/component/quickstart#on-demand).

### i18n
---

The stack includes all you need to get directly started with localization of your project. The folder `static/lang/` contains all available languages. The translations are written as `json`. You can also use nested objects to structure the translations. Let's have a look at an example translation file first:

```javascript
{
    "common": {
        "back": "Back"
    }
}
```

And this is how you can use it inside the template code of your component:

```html
<p>{{ $t('common.back') }}</p>
```

### FontAwesome 5
---
Currently version 5.1 of free icon set is integrated. There is a bit of an overhead if you like to use the icons because you have to import each icon seperatly to enable tree shaking which only includes icons you really use in the final bundle.

First you have to import the icon from the svg icon set you need, solid in this example, but brand is also integrated and then you can return the imported icon in a computed property:

```javascript
<script>
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

export default {
    computed: {
        fa() {

            // here you have to return all imported icons
            return {
                faAddressBook
            };
        }
    }
}
</script>
```

Second you can use the icon in your html template code. Notice that the component is named `fa` for easier use:

```html
<fa :icon="fa.faAddressBook" size="6x"></fa>
```

You can have a look at the [GitHub page](https://github.com/FortAwesome/vue-fontawesome#features) of FontAwesome Vue component to see the advanced features of this integration like the size in the example above.

### Moment Timezones

[Moment Timezone](https://momentjs.com/timezone/docs/) is used as a plugin so you can simply use it on the Vue instance like this which gives you current date including format:

```javascript
<script>
export default {
    computed: {
        now() {
            return new this.$moment().format("DD. MMMM YYYY");
        }
    }
}
</script>
```

You will also need to have a look at the [moment docs]() sometimes because moment timezone is based on moment and therefore the timezone docs only describes additions to moment.

## Fastify server
===

This stack is based on the [Fastify](https://www.fastify.io/docs/latest/) package. You can use it to implement an API for example. If you don't need it, it's fine too, then it will only serve the pages generated by nuxt very fast ;-).

This is a very basic example how to create a simple route inside the file `server/api/create-server.js`. For real projects and a bigger API you should split functionality and define your routes in separate files.

```javascript
async function buildServer() {
    const app = Fastify()
    
    // ...

    app.get('/api/ping', (request, reply) => {
        reply.send('pong')
    })

    // ...

    return app
}
```

## Testing
===

### Client side tests
---

Let's assume you have a file `classes/util/string.js` with the following content:

```javascript
export function reverse(value) {
    return value.split('').reverse().join('');
}
```

Then you can simply test it with a file named `string.test.js` located in the folder `tests/client/classes/util/`:

```javascript
import {
    reverse
} from '../../../../classes/util/string';

describe('String utils', () => {
    it('Reverse a string', () => {
        const result = reverse('Hello');

        expect(result).toBe('olleH');
    })
})
```

[expect](https://www.npmjs.com/package/expect) is the assertion library used in this stack. It is globally added in `tests/client/setup.js`.

You should always create the tests inside a folder structure that looks like the project structure of the file that should be tested. So if a file is located in `classes/util/` folder the test should be located in the folder `tests/client/classes/util/`.

### Server side tests
---

For server side tests this package uses [supertest](https://www.npmjs.com/package/supertest).

Here is an example of a simple test, that tests the route `/api/ping` as seen in the section about Fastify.

```javascript
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
```

It can be a bit confusing if you look at this example, because `expect` is used in different ways here. The difference is, that the `.expect()` called on the request result is a function provided by supertest whereas the `expect()` call inside the callback function is from the expect library.

Again for the structure of the tests you should keep the same folder structure inside the `tests/server/ ` directory as you use inside the `server/api/` folder. All files with name `*.test.js` are considered as test files.

## Bonus: CI/CD using [GitLab](https://about.gitlab.com/) and [Dokku](http://dokku.viewdocs.io/dokku/getting-started/installation/)

I personally use GitLab as versioning tool and it has great integration of continuous integration and deployment. In this section I'd like to share a few insights about configuring it using this stack. For me it works like a charm and you can even use badges showing the build state and test coverage.

First I'll show you the configuration file `.gitlab-ci.yml` which must be included in the project and that tells GitLab what to do after every push:

```yaml
stages:
    - test
    - deploy

variables:
    APP_NAME: <your-name-here>

test_client:
    stage: test
    image: node:latest
    cache:
        paths:
            - node_modules/
    script:
        - npm install
        - npm run test-client

test_server:
    stage: test
    image: node:latest
    cache:
        paths:
            - node_modules/
    script:
        - npm install
        - npm run test-server

deploy:
    stage: deploy
    image: ilyasemenov/gitlab-ci-git-push
    environment:
        name: production
        url: https://$APP_NAME.<your-domain-here>/
    only:
        - master
    script:
        - git-push ssh://dokku@<your-domain-here>:22/$APP_NAME
```

You only have to change two thinks here. Replace `<your-name-here>` with the name of the dokku app you created. To see how Nuxt projects are deployed to dokku you can check the [official docs](https://nuxtjs.org/faq/dokku-deployment/) of Nuxt. Second you must replace `<your-domain-here>` with your own domain under which dokku is running.

This config file defines two stages test and deploy. The test stage is separated in client and server tests which allows test runner in GitLab to execute the tests in parallel.

**IMPORTANT:** You must deploy the project manually the first time, otherwise the automatic deployment of GitLab will fail.
