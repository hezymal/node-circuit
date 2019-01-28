import { Express } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

interface IUser {
    username: string;
    password: string;
}
const user: IUser = {
    username: "gggg",
    password: "4444",
};

passport.serializeUser(function (user: IUser, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    cb(null, user);
});

export function init(app: Express) {
    const config = app.get("custom.config");

    passport.use(new Strategy((username, password, done) => {
        console.log(username);
        return done(null, user);
    }));

    app.use(session({ 
        secret: "123456",
        resave: false,
        saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
}