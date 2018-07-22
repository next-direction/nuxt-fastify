const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Full Stack Clean',
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
    css: [
        '~assets/styles/site.less'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {
            src: '~plugins/vuex-persistent.js',
            ssr: false
        },
        '~plugins/element-ui',
        '~plugins/filters',
        '~plugins/i18n.js',
        '~plugins/moment.js'
    ],

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
        ]
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
        maxChunkSize: 300000,
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
            }),
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|de/)
        ]
    },
    transition: 'fade'
}
