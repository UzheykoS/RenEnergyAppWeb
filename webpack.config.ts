import * as webpack from 'webpack';
import * as path from 'path';
import { Configuration, ProvidePlugin, DefinePlugin,  } from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.xml$/, loader: 'xml-loader'
            },
            {
                test: /\.json$/, loader: 'raw-loader'
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'template.ejs' }),
        new ExtractTextPlugin("styles.css"),
        new webpack.IgnorePlugin(/^\.\/locale/, /moment/)
    ]
};