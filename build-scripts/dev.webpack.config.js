const path = require("path");
const webpack = require("webpack");
const rootPath = path.resolve(__dirname, "..");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        bundle: [path.resolve(__dirname, "../src/front/index.tsx"), 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            { 
                test: /\.scss$/, 
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: "[name]__[local]__[hash:base64]",
                            modules: true,
                        },
                    },
                    "sass-loader",
                ],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            actions: path.resolve(rootPath, "src/front/actions/"),
            components: path.resolve(rootPath, "src/front/components/"),
            constants: path.resolve(rootPath, "src/constants/"),
            handlers: path.resolve(rootPath, "src/front/handlers/"),
            routes: path.resolve(rootPath, "src/routes/"),
            types: path.resolve(rootPath, "src/types/"),
            templates: path.resolve(rootPath, "src/templates/"),
        },
    },
};