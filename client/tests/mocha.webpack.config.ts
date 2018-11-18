// tslint:disable
const path = require('path');

module.exports = {
    output: {
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/,
                options: {
                    optimizeSSR: false,
                    loaders: {
                        scss: ["vue-style-loader", "css-loader"]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './'),
            '~': path.resolve(__dirname, './')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    externals: [require("webpack-node-externals")()], // in order to ignore all modules in node_modules folder
    devtool: "inline-cheap-module-source-map",
    target: "node", // webpack should compile node compatible code
};
