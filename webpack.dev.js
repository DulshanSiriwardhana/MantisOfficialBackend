const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './server.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        clean: true
    },
    mode: 'development',
    target: 'node',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "build-loader"
            }
        ]
    }
}