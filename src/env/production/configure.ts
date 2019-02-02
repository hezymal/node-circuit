import { Express, static as staticMiddleware } from "express";

function configure(app: Express) {
    // set statics route
    app.use(staticMiddleware("./dist"));
}

export default configure;