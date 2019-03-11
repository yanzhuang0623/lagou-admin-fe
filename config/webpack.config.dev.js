const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const gracefulFs = require('graceful-fs');
const fs = require('fs');
gracefulFs.gracefulify(fs);

const website = {
    publicPath: 'http://localhost:9000/'
}

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, '../src/app.js'),
        // runtime: path.resolve(__dirname, '../src/runtime.js')
    },
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: '[name].js',   // 'scripts/'代表创建scripts文件夹
        chunkFilename: '[name][chunkhash].js',
        publicPath: website.publicPath   //此选项可以在文件前加上公共的URL
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                },
                fallback: "style-loader",
            })
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,  //启用css module
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'  //指定css的类名格式
                    }
                },{
                    loader: 'sass-loader',
                }],
                fallback: "style-loader",
            })
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  outputPath: 'images/'  //指定输出目录
                }
              }
            ]
          },
          {
            test: /(\.jsx|\.js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
          },
          {
              test: /\.html$/,
              loader: "string-loader"  //资源文件转换为字符串
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new webpack.HotModuleReplacementPlugin(), //webpack 本身自带的热替换模块
        new ExtractTextPlugin("styles/[name].css"),  //将css单独抽离成一个文件
        new CopyWebpackPlugin([{                      //copy静态文件
            from: path.resolve(__dirname, '../lib'),
            to: 'lib/'
        }]),
    ],
    devServer: {
        contentBase: path.join(__dirname, '../index.html'),
        compress: true,
        port: 9000,
        hot: true,  //是否启动热替换
        inline: true, //当源文件改变时会自动刷新页面
        proxy: { // 代理设置
            // '/api/douban': {
            //     target: 'http://api.douban.com',
            //     changeOrigin: true,
            //     pathRewrite: {'^/api/douban' : ''}
            // },
            '/api':{
                target: 'http://localhost:3000/',
                changeOrigin: true,
            }
        },
        stats: 'errors-only' //通过此选项，可以精确控制要显示的 bundle 信息.这里只展示错误信息
    },
    // externals: {
    //     react: 'react'
    // }
}