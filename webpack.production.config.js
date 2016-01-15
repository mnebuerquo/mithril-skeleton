var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config');

module.exports = {
    entry: [
        /*===== yeoman entry hook =====*/
        './src/index.js',
        'bootstrap-sass!./bootstrap-sass.config.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: { root: [path.join(__dirname, 'bower_components')] },
    plugins: [
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),
        new CopyWebpackPlugin([ {from: './src/images/favicon.ico'} ]),
        new ExtractTextPlugin('styles.css', { allChunks: true }),
        new webpack.DefinePlugin({ 'CONFIG': JSON.stringify( require('./config') ) }),
        new webpack.ProvidePlugin({
            /*===== yeoman provide plugin hook =====*/
            m: 'mithril'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: { warnings: false }
        })
    ],
    module: {
        loaders: [
            // ES6 transpiler
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            /*===== yeoman sass hook end =====*/
            // Static files
            {
                test: /\.html$/,
                loader: 'static'
            },
            // Image files
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=8192'
            },
            // Font files
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
    }
};
