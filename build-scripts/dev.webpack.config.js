const path = require("path");

const rootPath = path.resolve(__dirname, "..");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        bundle: rootPath + "/src/client.tsx",
    },
    output: {
        path: rootPath + "/dist",
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
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            Actions: path.resolve(rootPath, "src/Actions/"),
            Components: path.resolve(rootPath, "src/Components/"),
            Constants: path.resolve(rootPath, "src/Constants/"),
            Handlers: path.resolve(rootPath, "src/Handlers/"),
            Routes: path.resolve(rootPath, "src/Routes/"),
            Templates: path.resolve(rootPath, "src/Templates/"),
            Types: path.resolve(rootPath, "src/Types/"),
        },
    },
};