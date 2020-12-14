const path = require("path");
const nodeExternals = require('webpack-node-externals'); // 오류 때문에 추가
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    devtool: "cheap-module-source-map", // 에러나서 추가 됨
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [{
                test: /\.(js)$/,
                use: [{
                    loader: "babel-loader",
                }, ],
            },
            {
                test: /\.(scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        autoprefixer,
                                        {
                                            //options
                                            browsers: "cover 99.5%",
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    externals: [nodeExternals()],
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js",
    },
    plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
};

module.exports = config;