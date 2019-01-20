const path = require("path");

const rootPath = path.resolve(__dirname, "..");

module.exports = {
    mode: "development",
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
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
};