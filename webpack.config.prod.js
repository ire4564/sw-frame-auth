const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => ({
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index.js', // 변경되지 않는 파일들은 캐싱
        publicPath: '/',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
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
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
    optimization: {
        concatenateModules: true, // 용량 축소, production mode에서만 가능
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new ForkTsCheckerWebpackPlugin(), // transpileOnly: true로 인한 문제 해결, 분리된 프로세스에서 타입 검사
        new MiniCssExtractPlugin({ filename: 'css/app.css' }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            eslintPath: require.resolve('eslint'),
        }),
    ],
    externals: {
        // Don't bundle react or react-dom
        'react': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    stats: {
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
    }, // 상태표시
    devServer: {
        host: 'localhost',
        port: 3000,
    },
});
