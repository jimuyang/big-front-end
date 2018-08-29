/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const webpack = require('webpack');

module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        another: './src/another_module.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Code Splitting',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(["dist"]),
    ],
    optimization: {
        splitChunks: {
            name: "common"
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
