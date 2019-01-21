const path = require("path");

const rootPath = path.resolve(__dirname, "..");

module.exports = {
    mode: "development",
    entry: {
        bundle: rootPath + "/src/front-client.tsx",
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