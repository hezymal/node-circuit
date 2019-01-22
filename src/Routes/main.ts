import { RequestHandler } from "express";

const route: RequestHandler = (req, res) => {
    res.render("main", {
        title: "node-circuit",
        bundle: "/bundle.js",
    });
};

export default route;
