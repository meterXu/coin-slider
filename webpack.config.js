const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const webpack = require('webpack');
const config = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },
    entry: {
        index:"./src/main.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].js",
        publicPath: "/",
        library: 'coinSlider',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath:"/"
                        }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        host:"localhost",
        port:8080,
        open: true,
        hot: true,
    },
    resolve:{
        alias: {
            cssPath:path.resolve(__dirname,'src/assets'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename: "common.css"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./index.html",
            hash:true
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery',
        })
    ]
};
module.exports = config;
