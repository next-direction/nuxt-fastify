const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Full Stack Example',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#FFFFFF'
    },

    /*
     ** Global CSS
     */
    css: [],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage

        '@nuxtjs/axios', [
            'nuxt-fontawesome', {
                component: 'fa',
                imports: []
            }
        ],
        [
            '@nuxtjs/moment', ['de']
        ],
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {

        },
        babel: {
            'presets': ['vue-app'],
            'plugins': [
                ['component', [{
                    'libraryName': 'element-ui',
                    'styleLibraryName': 'theme-chalk'
                }]]
            ],
            'comments': false
        },
        plugins: [
            new webpack.ProvidePlugin({
                '_': 'lodash'
            })
        ]


    }
}
