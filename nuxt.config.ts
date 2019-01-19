const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    /*
     ** Axios module configuration
     */
    "axios": {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    "build": {
        // analyze: true,
        babel: {
            comments: false,
            plugins: [
                ["component", {
                    libraryName: "element-ui",
                    styleLibraryName: "theme-chalk",
                }],
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: "lodash",
            }),
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|de/),
        ],
    },

       /*
     ** Global CSS
     */
    "css": [
        "~assets/styles/site.less",
    ],

    /*
     ** Headers of the page
     */
    "head": {
        link: [{
            href: "/favicon.png",
            rel: "icon",
            type: "image/png",
        }],
        meta: [{
            charset: "utf-8",
        },
        {
            content: "width=device-width, initial-scale=1",
            name: "viewport",
        },
        {
            content: pkg.description,
            hid: "description",
            name: "description",
        },
        ],
        title: "Full Stack Clean",
    },

    /*
     ** Customize the progress-bar color
     */
    "loading": {
        color: "#FFFFFF",
    },

    "mode": "universal",

    /*
    ** Nuxt.js modules
    */
   "modules": [
        // Doc: https://github.com/nuxt-community/axios-module#usage

        "@nuxtjs/axios",
        "nuxt-fontawesome",
        "~modules/typescript.ts",
    ],

    "nuxt-fontawesome": {
        component: "fa",
        imports: [],
    },

    /*
     ** Plugins to load before mounting the App
     */
    "plugins": [
        {
            src: "~plugins/vuex-persistent.ts",
            ssr: false,
        },
        "~plugins/element-ui.ts",
        "~plugins/filters.ts",
        "~plugins/i18n.ts",
        "~plugins/moment.ts",
    ],

    "srcDir": "client",

    "transition": "fade",
}
