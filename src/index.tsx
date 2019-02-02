import { ensureLoggedIn } from "connect-ensure-login";
import { urlencoded } from "body-parser";
import express from "express";
import passport from "passport";
import mustache from "mustache-express";
import mainRoute from "routes/main";
import addRoute from "routes/add";
import { init as initAuth } from "system/auth";
import * as config from "../config.json";
import configure from "env/configure";

// create server
const app = express();

// set custom config
app.set("custom.config", config);

// set mustache
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", __dirname + "/Templates");

// set url encoder
app.use(urlencoded({ extended: false }));

// configuring for envirmonent
configure(app);

// initialize auth
initAuth(app);

// set routes
app.get("/add", addRoute);
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/",
    failureRedirect: "/login",
}));
app.get("/profile", ensureLoggedIn("/login"), (req, res) => {
    res.render("profile");
});
app.get("/", mainRoute);

// run server
app.listen(config.server.port, () => {
    console.log(`Server listening on port: ${config.server.port}`);
});
