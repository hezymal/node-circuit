import { Express } from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddlware from "webpack-hot-middleware";
import webpackConfig from "build-scripts/dev.webpack.config";

function configure(app: Express) {
    // set webpack
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: "/",
    }));
    app.use(webpackHotMiddlware(compiler));
}

export default configure;