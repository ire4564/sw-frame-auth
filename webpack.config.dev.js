const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => ({
    mode: 'development',
    entry: './demo/index.tsx',
    output: {
        path: path.resolve(__dirname, './demo'),
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // 타입 검사를 제외한 트랜스파일링
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css?$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/,
            }, // camelCase 사용 불가, 별도 option처리 해야 가능
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            filename: 'index.html',
        }),
        new ForkTsCheckerWebpackPlugin(), // transpileOnly: true로 인한 문제 해결, 분리된 프로세스에서 타입 검사
        new MiniCssExtractPlugin({ filename: 'css/app.css' }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        allowedHosts: ['.sandworks.co.kr'],
    },
});
